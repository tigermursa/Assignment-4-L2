// src/pages/BookDetails.tsx
import React from "react";
import { useGetBookByIdQuery } from "@/redux/features/books/booksApi";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetBookByIdQuery(id || "");
  const book = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Unable to load book details.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{book.title}</CardTitle>
          <CardDescription>
            {book.description || "No description available."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Author:</span> {book.author}
            </div>
            <div>
              <span className="font-semibold">Genre:</span>{" "}
              <Badge variant="secondary">
                {book.genre
                  .split("_")
                  .map((w) => w[0] + w.slice(1).toLowerCase())
                  .join(" ")}
              </Badge>
            </div>
            <div>
              <span className="font-semibold">ISBN:</span> {book.isbn}
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Copies:</span>{" "}
              <span>{book.copies}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Availability:</span>
              <Badge variant={book.available ? "success" : "destructive"}>
                {book.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
            <div>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(book.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold">Last Updated:</span>{" "}
              {new Date(book.updatedAt).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetails;
