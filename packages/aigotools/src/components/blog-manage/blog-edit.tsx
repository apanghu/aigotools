"use client";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import { managerSearchBlogs, saveBlog } from "@/lib/actions";
import { Blog } from "@/models/blog";

import "react-markdown-editor-lite/lib/index.css";
import { uploadStringToMinio } from "@/lib/minio";
export default function BlogEdit({
  blog,
  onClose,
}: {
  blog?: Blog;
  onClose: () => void;
}) {
  const { register, getValues, setValue, watch, reset, trigger, formState } =
    useForm<Blog>({
      defaultValues: blog,
    });

  const t = useTranslations("blogEdit");

  const formValues = watch();

  const [isOpen, setIsOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [icon, setIcon] = useState(null);

  const [content, setContent] = useState("");

  // 初始化Markdown解析器
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // useEffect(() => {
  //   reset(blog);
  //   setIsOpen(!!blog);
  // }, [reset, blog]);

  useEffect(() => {
    if (blog) {
      reset(blog);
      setContent(blog.content || ""); // 初始化为 blog.content 或空字符串
      setIsOpen(true);
    } else {
      reset(blog);
      setContent(""); // 清空内容
      setIsOpen(false);
    }
  }, [reset, blog]);

  const onSubmit = useCallback(async () => {
    if (saving) {
      return;
    }
    try {
      if (!(await trigger())) {
        return;
      }
      setSaving(true);
      const values = getValues();

      values.content = content; // 手动赋值为最新的 content
      await saveBlog(values);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(t("saveFailed"));
    } finally {
      setSaving(false);
    }
  }, [saving, trigger, getValues, t, onClose, content]);

  const { data: allTopBlogs } = useQuery({
    queryKey: ["get-top-blogs"],
    queryFn: async () => {
      const res = await managerSearchBlogs({
        page: 1,
        size: 999,
      });

      return res.blogs;
    },
    initialData: [],
  });

  // 处理Markdown编辑器内容变更
  const handleEditorChange = ({ html, text }: any) => {
    setContent(text);
  };

  //https://zhuanlan.zhihu.com/p/662433315
  const handleImageUpload = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = async (data: any) => {
        //一定要把base64转化为string格式
        const base64 = data.target.result.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        //数据处理完发起put请求，完成图像上传。
        const res = await uploadStringToMinio(base64, file.type);

        //对返回的res.url图像存储的路径resolve出去，实现云上的图像的展示
        resolve(res);
      };
      reader.readAsDataURL(file);
    });
  };
  const handleClose = () => {
    setIsOpen(false);
    setContent(""); // 清空 content 状态
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalContent>
        <ModalHeader>
          {blog?._id ? t("updateTitle") : t("newTitle")}
        </ModalHeader>
        <ModalBody>
          <form className="overflow-auto space-y-4">
            <Input
              isRequired
              label={t("name")}
              size="sm"
              value={formValues.name}
              {...register("name", {
                required: true,
              })}
              color={formState.errors.name ? "danger" : "default"}
            />
            <Input
              isRequired
              label={t("slug")}
              size="sm"
              value={formValues.slug}
              {...register("slug", {
                required: true,
              })}
              color={formState.errors.name ? "danger" : "default"}
            />
            {/* <DatePicker
              value={publishedAt || dateValue} // 初始值为当前日期
              label={t("publishedAt")}
              onChange={handleChange}
            /> */}
            <Input
              isRequired
              label={t("author")}
              size="sm"
              value={formValues.author}
              {...register("author", {
                required: true,
              })}
              color={formState.errors.name ? "danger" : "default"}
            />
            <Input
              isRequired
              label={t("description")}
              size="sm"
              value={formValues.description}
              {...register("description", {
                required: true,
              })}
              color={formState.errors.name ? "danger" : "default"}
            />

            <Input
              isRequired
              label={t("image")}
              size="sm"
              value={formValues.image}
              {...register("image", {
                required: true,
              })}
              color={formState.errors.name ? "danger" : "default"}
            />
            <MdEditor
              renderHTML={(text) => mdParser.render(text)}
              style={{ height: "50vh" }}
              value={content}
              view={{ menu: true, md: true, html: true }} // 禁用实时预览，仅保留Markdown编辑
              onChange={handleEditorChange}
              onImageUpload={handleImageUpload}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="default" size="sm" onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button
            color="primary"
            isLoading={saving}
            size="sm"
            onClick={onSubmit}
          >
            {t("save")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
