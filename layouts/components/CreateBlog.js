import { useState } from "react";

const CreateBlog = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform actions like submitting the blog post here
        // For example: props.onSubmit({ title, content });
    };

    return (
        <div className="container mx-auto mt-10">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-indigo-500"
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-indigo-500 h-32 resize-none"
                        placeholder="Enter content"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Create Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
