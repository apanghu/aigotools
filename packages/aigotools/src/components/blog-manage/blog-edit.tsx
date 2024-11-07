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
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { managerSearchBlogs, saveBlog } from "@/lib/actions";
import { Blog } from "@/models/blog";

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
        type: "top",
      });

      return res.blogs;
    },
    initialData: [],
  });

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
              label={t("icon")}
              size="sm"
              value={formValues.icon}
              {...register("icon")}
            />
            <Input
              label={t("content")}
              size="sm"
              value={formValues.content}
              {...register("content")}
            />
            <Input
              label={t("category")}
              size="sm"
              value={formValues.category}
              {...register("category")}
            />
            {/* <DatePicker
              label={t("publishedAt")}
              size="sm"
              value={formValues.publishedAt}
              {...register("publishedAt")}
            /> */}
            <Input
              label={t("author")}
              size="sm"
              value={formValues.author}
              {...register("author")}
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
