// pages/create-blog.js

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
// import 'jodit/build/jodit.min.css'; // Correct CSS import for Jodit Editor
import { TextField, Chip, Box, Button } from '@mui/material';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const CreateBlog = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [draft, setDraft] = useState(false);
  const [metadata, setMetaData] = useState({
    seoTitle: '',
    seoDescription: '',
    seoKeywords: []
  });
  const [seoKeywordsInput, setSeoKeywordsInput] = useState('');

  const editor = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleCategoriesChange = (e) => {
    const input = e.target.value;
    if (input.endsWith(',')) {
      const newTag = input.slice(0, -1).trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setCategories('');
    } else {
      setCategories(input);
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const handleFeaturedChange = (e) => {
    setFeatured(e.target.checked);
  };

  const handleDraftChange = (e) => {
    setDraft(e.target.checked);
  };

  const handleSeoTitleChange = (e) => {
    setMetaData({ ...metadata, seoTitle: e.target.value });
  };

  const handleSeoDescriptionChange = (e) => {
    setMetaData({ ...metadata, seoDescription: e.target.value });
  };

  const handleSeoKeywordsChange = (e) => {
    const input = e.target.value;
    if (input.endsWith(',')) {
      const newKeyword = input.slice(0, -1).trim();
      if (newKeyword && !metadata.seoKeywords.includes(newKeyword)) {
        setMetaData({
          ...metadata,
          seoKeywords: [...metadata.seoKeywords, newKeyword]
        });
      }
      setSeoKeywordsInput('');
    } else {
      setSeoKeywordsInput(input);
    }
  };

  const handleDeleteSeoKeyword = (keywordToDelete) => {
    setMetaData({
      ...metadata,
      seoKeywords: metadata.seoKeywords.filter((keyword) => keyword !== keywordToDelete)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 

    let inputData  = {
      file,
      title,
      content,
      categories,
      tags,
      featured,
      draft,
      metadata,
      seoKeywordsInput
    }

    console.log("input",inputData)
    

    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('title', title);
    // formData.append('content', content);
    // formData.append('categories', JSON.stringify(tags)); // Assuming tags are categories
    // formData.append('tags', JSON.stringify(tags)); // Tags array
    // formData.append('featured', featured);
    // formData.append('draft', draft);
    // formData.append('metadata', JSON.stringify(metadata));
    // formData.append('thumbnail', "https://th.bing.com/th/id/OIP.YolfISs0pV7Kc0c4BaGahgHaHa?w=512&h=512&rs=1&pid=ImgDetMain");

    
    console.log("form",process.env.NEXT_PUBLIC_API_URL)

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/create-post`, inputData, {
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // }
      });

      if (data.success) {
        alert("Post Created Successfully");
      } else {
        alert("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Error creating post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-7">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
            Featured Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="file"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
            Content
          </label>
          <div className="border rounded-md min-h-[540px]">
            <JoditEditor
              ref={editor}
              value={content}
              onChange={handleContentChange}
              config={{ readonly: false, height: 540 }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="categories">
            Categories (comma separated)
          </label>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter categories"
            value={categories}
            onChange={handleCategoriesChange}
          />
          <Box mt={2}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                style={{ margin: '0 4px 4px 0' }}
              />
            ))}
          </Box>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="featured">
            Featured
          </label>
          <input
            id="featured"
            type="checkbox"
            checked={featured}
            onChange={handleFeaturedChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="draft">
            Draft
          </label>
          <input
            id="draft"
            type="checkbox"
            checked={draft}
            onChange={handleDraftChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="seoTitle">
            SEO Title
          </label>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter SEO title"
            value={metadata.seoTitle}
            onChange={handleSeoTitleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="seoDescription">
            SEO Description
          </label>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter SEO description"
            value={metadata.seoDescription}
            onChange={handleSeoDescriptionChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="seoKeywords">
            SEO Keywords (comma separated)
          </label>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter SEO keywords"
            value={seoKeywordsInput}
            onChange={handleSeoKeywordsChange}
          />
          <Box mt={2}>
            {metadata.seoKeywords.map((keyword, index) => (
              <Chip
                key={index}
                label={keyword}
                onDelete={() => handleDeleteSeoKeyword(keyword)}
                style={{ margin: '0 4px 4px 0' }}
              />
            ))}
          </Box>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
