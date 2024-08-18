import React from 'react'

const AddBook = () => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          {errors.author && <p>{errors.author}</p>}
        </div>
        <div>
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
          {errors.isbn && <p>{errors.isbn}</p>}
        </div>
        <div>
          <label htmlFor="publishedDate">Published Date:</label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            required
          />
          {errors.publishedDate && <p>{errors.publishedDate}</p>}
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
          {errors.genre && <p>{errors.genre}</p>}
        </div>
        <div>
          <label htmlFor="copiesAvailable">Copies Available:</label>
          <input
            type="number"
            id="copiesAvailable"
            name="copiesAvailable"
            value={formData.copiesAvailable}
            onChange={handleChange}
            min="0"
            required
          />
          {errors.copiesAvailable && <p>{errors.copiesAvailable}</p>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="500"
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
          />
          {coverImage && <p>Selected file: {coverImage.name}</p>}
        </div>
        <button type="submit">Add Book</button>
      </form>
    </>
  );
}

export default AddBook