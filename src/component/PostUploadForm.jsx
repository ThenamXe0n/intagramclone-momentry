import React from "react";
import { useForm } from "react-hook-form";
import { uploadPostAPI } from "../services/apiCollections";

const PostUploadForm = () => {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm();

  async function handlePostUpload(data) {
    let payload = {
      ...data,
      likes: [],
      createdAt: new Date().toLocaleDateString(),
      userId: loggedInUser.id,
    };
    try {
      let response = await uploadPostAPI(payload);
      alert("post uploaded successfully!");
      reset()
    } catch (error) {
      alert("failed to upload posts!");
      console.log(error.message);
    }
  }

  return (
    //  <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-4 py-8">
    <div className="w-full max-w-[350px] mx-auto flex flex-col items-center">
      {/* Card */}
      <div className="w-full bg-white border border-neutral-200 rounded-lg p-8 mb-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/header_logo-removebg-preview.png"
            alt="Momentry"
            className="h-12 w-auto text-neutral-900"
          />
        </div>

        <p className="text-center text-neutral-500 text-sm font-medium mb-6">
          Upload new post
        </p>

        <form
          onSubmit={handleSubmit(handlePostUpload)}
          className="flex flex-col gap-3"
        >
          <div>
            <input
              type="url"
              placeholder="paste image url eg https://shutterstock.in/abc.png"
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
              aria-invalid={errors.image ? "true" : "false"}
              {...register("image", {
                required: "Image url is required",
              })}
            />
            {errors.image && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="enter a caption for your post"
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
              aria-invalid={errors.caption ? "true" : "false"}
              {...register("caption")}
            />
            {errors.caption && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.caption.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 mt-1 text-sm font-semibold text-white bg-[#0095f6] hover:bg-[#1877f2] disabled:opacity-60 disabled:pointer-events-none rounded-lg transition-colors"
          >
            {isSubmitting ? "Uploading…" : "Upload Post"}
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default PostUploadForm;
