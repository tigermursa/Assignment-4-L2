import React from "react";
import { useGetSummaryQuery } from "@/redux/features/books/booksApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/loader/Loader";

const BookSummary: React.FC = () => {
  const { data, isLoading } = useGetSummaryQuery(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="pt-20 h-[100vh]">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {data?.data.map((item, idx) => (
          <Card key={idx} className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">
                {item.book.title.trim()}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-semibold">ISBN:</span> {item.book.title}
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Total Borrowed:</span>
                <Badge variant="secondary">{item.totalQuantity}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookSummary;
