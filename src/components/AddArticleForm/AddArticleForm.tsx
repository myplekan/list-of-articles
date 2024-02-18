import "./AddArticleForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/hooks";
import { addArticles } from "../../features/ownArticles";

type FormFields = {
  urlToImage: string;
  author: string;
  description: string;
  title: string;
};

export const AddArticleForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>();

  const urlToImageConfig = {
    required: "Image URL is required!",
    validate: (value: string) => {
      const trimmedValue = value.trim();

      setValue("urlToImage", trimmedValue);

      if (!value.startsWith("https://")) {
        return "Image URL must start from https://";
      }

      return true;
    },
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const date = new Date();

    dispatch(
      addArticles({
        urlToImage: data.urlToImage,
        author: data.author,
        description: data.description,
        title: data.title,
        publishedAt: 'user' + date.getTime(),
        content: "",
        source: {},
        url: "",
      })
    );

    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label className="form-label">
        Image URL:
        <input {...register("urlToImage", urlToImageConfig)} type="text" />
        {errors.urlToImage && (
          <div className="text-red-600">{errors.urlToImage.message}</div>
        )}
      </label>

      <label className="form-label">
        Title:
        <input
          {...register("title", {
            required: "Title is required!",
            validate: (value: string) => {
              const trimmedValue = value.trim();

              setValue("title", trimmedValue);

              return true;
            },
          })}
          type="text"
        />
        {errors.title && (
          <div className="text-red-600">{errors.title.message}</div>
        )}
      </label>

      <label className="form-label">
        Author:
        <input
          {...register("author", {
            required: "Author is required!",
            validate: (value: string) => {
              const trimmedValue = value.trim();

              setValue("author", trimmedValue);

              return true;
            },
          })}
          type="text"
        />
        {errors.author && (
          <div className="text-red-600">{errors.author.message}</div>
        )}
      </label>

      <label className="form-label">
        Description:
        <input
          {...register("description", {
            required: "Description is required!",
            validate: (value: string) => {
              const trimmedValue = value.trim();

              setValue("description", trimmedValue);

              return true;
            },
          })}
          type="text"
        />
        {errors.description && (
          <div className="text-red-600">{errors.description.message}</div>
        )}
      </label>

      <button
        className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
        border-blue-600
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Adding..." : "Add Article"}
      </button>
    </form>
  );
};
