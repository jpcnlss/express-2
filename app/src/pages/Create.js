import React, { useState } from "react";
import { H2 } from "@leafygreen-ui/typography";
import TextInput from '@leafygreen-ui/text-input';
import FormFooter from "@leafygreen-ui/form-footer";
import Toast from "@leafygreen-ui/toast";
import { css } from "@leafygreen-ui/emotion";
import { baseUrl } from "../config";

const formStyle = css`
  height: 100vh;
  min-width: 767px;
  margin: 10px;

  input {
    margin-bottom: 20px;
  }
`

export default function NewPost() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null); // Assuming you have a state for the image file
  const [toastOpen, setToastOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("author", author);
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("image", image);

    await fetch(`${baseUrl}/posts`, {
      method: "POST",
      body: formData,
    }).then(resp => resp.json());
    setAuthor("");
    setTitle("");
    setTags("");
    setImage(null);
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3000);
  }

  return (
    <React.Fragment>
      <H2>Write New Post</H2>
      <form className={formStyle}>
        <TextInput
          label="Author"
          description="Enter your name"
          onChange={e => setAuthor(e.target.value)}
          value={author}
        />
        <TextInput
          label="Title"
          description="Enter the title for this blog post"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <TextInput
          label="Tags"
          description="Enter tags for the post, comma separated if multiple"
          onChange={e => setTags(e.target.value)}
          value={tags}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <FormFooter
          primaryButton={{
            text: 'Save Blog Post',
            onClick: handleSubmit
          }}
        />
      </form>

      <Toast
        variant="success"
        title="Post Created"
        body="Your blog post was successfully created."
        open={toastOpen}
        close={() => setToastOpen(false)}
      />
    </React.Fragment>
  )
}