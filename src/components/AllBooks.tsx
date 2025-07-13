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
import {
  useGetAllBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "@/redux/features/books/booksApi";
import type { Genre, IBook } from "@/types/booksTypes";

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

const AllBooks: React.FC = () => {
  const { data, isLoading, refetch } = useGetAllBookQuery(null);
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<IBook | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<
    Partial<IBook>
  >({
    defaultValues,
  });
  const selectedGenre = watch("genre");

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
      setEditData(null);
    }
  }, [open, reset]);

  const onSubmit = async (formData: Partial<IBook>) => {
    try {
      if (editData) {
        await updateBook({ id: editData._id, ...formData }).unwrap();
      } else {
        await addBook(formData as Omit<IBook, "_id">).unwrap();
      }
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
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
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Book List</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Add Book</Button>
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
                onValueChange={(value) => setValue("genre", value as Genre)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Genre" />
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
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-900 text-blue-300">
                      {book.available ? "Available" : "Unavailable"}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </Button>
                    <Button variant="outline" size="sm">
                      Borrow
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
