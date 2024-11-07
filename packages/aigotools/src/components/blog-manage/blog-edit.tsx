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
  Select,
  SelectItem,
  Switch,
  DatePicker,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { managerSearchBlogs, saveBlog } from "@/lib/actions";
import { Blog } from "@/models/blog";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

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

  useEffect(() => {
    reset(blog);
    setIsOpen(!!blog);
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

      await saveBlog(values);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(t("saveFailed"));
    } finally {
      setSaving(false);
    }
  }, [saving, trigger, getValues, t, onClose]);

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

  // 处理封面图片上传
  const handleImageUpload = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    if (file) {
      // setIcon(URL.createObjectURL(file));
    }
  };
  // 处理Markdown编辑器内容变更
  const handleEditorChange = ({ html, text }: any) => {
    console.log("handleEditorChange", html, text);
    setContent(text);
  };

  //https://zhuanlan.zhihu.com/p/662433315
  // //上传图像的接口
  // const uploadToAliOSS = (file: any, buffer: any) => {
  //   const client = new OSS({
  //     // accessKeyId、accessKeySecret进入网站点击个人头像申请accesskey管理，创建一个上传图像身份校验的key
  //     accessKeyId: "",
  //     accessKeySecret: "",
  //     //bucket 这个是你bucket列表的bucket名称
  //     bucket: "",
  //     //您购买的的region地区，我买的是杭州的。具体看您买的哪里的，填写根据文档（https://github.com/ali-sdk/ali-oss/blob/5.x/README.md#data-regions）
  //     region: "oss-cn-hangzhou",
  //   });
  //   // 上传图像

  //   return client.put(
  //     //oss图像存储的路径和具体的文件名，我采用的是图像上传的时间，这样可以很好的避免命名冲突。
  //     // 可以在oss存储空间创建一个文件夹只放该项目的图像
  //     `chromImage/${new Date().getTime()}.${file.type.split("/").pop()}`,
  //     buffer,
  //     {
  //       "Content-Type": file.type,
  //     }
  //   );
  // };

  // const handleImageUpload = (file: any) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onload = async (data: any) => {
  //       //一定要把base64转化为buffer格式上传到阿里云，不然上传的图像是无法打开的
  //       const base64 = data.target.result.replace(
  //         /^data:image\/\w+;base64,/,
  //         ""
  //       );
  //       var dataBuffer = new OSS.Buffer(base64, "base64");
  //       //数据处理完发起put请求，完成图像上传。
  //       const res = await uploadToAliOSS(file, dataBuffer);
  //       //对返回的res.url图像存储的路径resolve出去，实现云上的图像的展示
  //       resolve(res.url);
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

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
              label={t("category")}
              size="sm"
              value={formValues.category}
              {...register("category", {
                required: true,
              })}
              color={formState.errors.name ? "danger" : "default"}
            />
            {/* <DatePicker
              label={t("publishedAt")}
              size="sm"
              {...register("publishedAt")}
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
            <MdEditor
              value={content}
              style={{ height: "50vh" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              // onImageUpload={handleImageUpload}
              view={{ menu: true, md: true, html: true }} // 禁用实时预览，仅保留Markdown编辑
            />
          </form>
        </ModalBody>
        <ModalFooter>
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
