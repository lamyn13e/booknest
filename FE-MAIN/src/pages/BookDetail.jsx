import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const mockReviews = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Cuốn sách rất hay và bổ ích, đáng để đọc!',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      rating: 4,
      comment: 'Nội dung hấp dẫn, nhưng phần cuối hơi dài dòng.',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      rating: 3,
      comment: 'Sách ổn, phù hợp với người mới bắt đầu.',
    },
  ];

  useEffect(() => {
    axios.get(`http://localhost:8081/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!book) return <div className="text-center mt-10">Đang tải...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-bg">
          <Header />
          <div className="max-w-4xl mx-auto my-10 px-4">
      {/* Book Detail */}
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded shadow">
        <div className="md:w-1/3">
          <img
            src={book.coverUrl || 'https://via.placeholder.com/400x550?text=No+Image'}
            alt={book.title}
            className="w-full rounded"
          />
        </div>
        <div className="md:w-2/3 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <p className="text-muted mb-2">Tác giả: {book.author}</p>
          <p className="text-muted mb-4">Thể loại: {book.categoryName}</p>
          <p className="mb-4">{book.description || 'Không có mô tả.'}</p>
          <div className="text-2xl font-bold text-primary mb-4">{book.price.toLocaleString()}₫</div>
          <button className="bg-secondary text-white px-6 py-3 rounded hover:bg-primary">
            Thêm vào giỏ
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Đánh giá từ người đọc</h2>
        {mockReviews.map(review => (
          <div key={review.id} className="border-b py-4">
            <p className="font-semibold">{review.name}</p>
            <div className="text-yellow-500 mb-1">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
          <Footer />
    </div>
    
  );
}
