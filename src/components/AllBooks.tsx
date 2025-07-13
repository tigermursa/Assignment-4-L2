import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import {
  useGetAllBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
} from "@/redux/features/books/booksApi";
import type { Genre, IBook } from "@/types/booksTypes";
import Loader from "@/components/loader/Loader";
import { Link } from "react-router";

const GENRES: Genre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const defaultValues: Omit<IBook, "_id"> = {
  title: "",
  author: "",
  genre: "FICTION",
  isbn: "",
  description: "",
  copies: 1,
  available: true,
};

interface IBorrowForm {
  quantity: number;
  dueDate: string;
}

const AllBooks: React.FC = () => {
  const [params, setParams] = useState<{
    filter?: string;
    page: number;
    limit: number;
  }>({ filter: undefined, page: 1, limit: 5 });
  const { filter, page, limit } = params;
  const { data, isLoading } = useGetAllBookQuery({ filter, page, limit });

  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [borrowBook] = useBorrowBookMutation();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<IBook | null>(null);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<
    Partial<IBook>
  >({ defaultValues });
  const selectedGenre = watch("genre");
  const {
    register: regBorrow,
    handleSubmit: onBorrowSubmit,
    reset: resetBorrow,
  } = useForm<IBorrowForm>({ defaultValues: { quantity: 1, dueDate: "" } });

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
      setEditData(null);
    }
  }, [open, reset]);

  useEffect(() => {
    if (!borrowOpen) {
      resetBorrow({ quantity: 1, dueDate: "" });
      setSelectedBook(null);
    }
  }, [borrowOpen, resetBorrow]);

  const onSubmit = async (formData: Partial<IBook>) => {
    try {
      if (editData)
        await updateBook({ id: editData._id, ...formData }).unwrap();
      else await addBook(formData as Omit<IBook, "_id">).unwrap();
      setParams((p) => ({ ...p }));
    } catch (e) {
      console.error(e);
    } finally {
      setOpen(false);
    }
  };

  const onBorrow = async (dataBorrow: IBorrowForm) => {
    if (!selectedBook) return;
    try {
      await borrowBook({ book: selectedBook._id, ...dataBorrow }).unwrap();
      setParams((p) => ({ ...p }));
    } catch (e) {
      console.error(e);
    } finally {
      setBorrowOpen(false);
    }
  };

  const handleEdit = (book: IBook) => {
    setEditData(book);
    reset(book);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      setParams((p) => ({ ...p }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleBorrowOpen = (book: IBook) => {
    setSelectedBook(book);
    setBorrowOpen(true);
  };

  const changePage = (newPage: number) => {
    if (!data) return;
    if (newPage < 1 || newPage > data.pages) return;
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  const hasNext = data ? page < data.pages : false;

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Book List</h2>
        <Button onClick={() => setOpen(true)}>Add Book</Button>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editData ? "Update Book" : "Add New Book"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("title", { required: true })}
              placeholder="Title"
            />
            <Input
              {...register("author", { required: true })}
              placeholder="Author"
            />
            <Select
              value={selectedGenre}
              onValueChange={(v) => setValue("genre", v as Genre)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g
                      .split("_")
                      .map((w) => w[0] + w.slice(1).toLowerCase())
                      .join(" ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              {...register("isbn", { required: true })}
              placeholder="ISBN"
            />
            <Input
              {...register("copies", { required: true, valueAsNumber: true })}
              type="number"
              placeholder="Copies"
            />
            <Input {...register("description")} placeholder="Description" />
            <Button type="submit">{editData ? "Update" : "Add"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Borrow Dialog */}
      <Dialog open={borrowOpen} onOpenChange={setBorrowOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow "{selectedBook?.title}"</DialogTitle>
          </DialogHeader>
          <form onSubmit={onBorrowSubmit(onBorrow)} className="space-y-4">
            <Input
              {...regBorrow("quantity", {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Quantity"
              min={1}
            />
            <Input
              {...regBorrow("dueDate", { required: true })}
              type="datetime-local"
            />
            <Button type="submit">Confirm Borrow</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {book.genre
                      .split("_")
                      .map((w) => w[0] + w.slice(1).toLowerCase())
                      .join(" ")}
                  </Badge>
                </TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  <Badge variant={book.available ? "outline" : "destructive"}>
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button size="sm" onClick={() => handleEdit(book)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBorrowOpen(book)}
                  >
                    Borrow
                  </Button>
                  <Link to={`/books/${book._id}`}>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <Button onClick={() => changePage(page - 1)} disabled={page <= 1}>
          Prev
        </Button>
        <span>
          Page {page} of {data?.pages}
        </span>
        <Button onClick={() => changePage(page + 1)} disabled={!hasNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllBooks;
