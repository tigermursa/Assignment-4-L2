import { baseApi } from "@/redux/api/baseApi";
import type { IBook } from "@/types/booksTypes"; //book types

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //! create function
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books`, //have to change
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),

    //! get function
    getAllBook: builder.query<{ data: IBook[] }, null>({
      query: () => ({
        url: `/books`,
        method: "GET",
      }),
      providesTags: ["data"],
    }),

    //!get single with id function
    getBookById: builder.query({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
      providesTags: ["data"],
    }),

    //!Update function
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),

    //! Delete function
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["data"],
    }),

    //! post borrow book
    borrowBook: builder.mutation({
      query: (data) => ({
        url: `/borrow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),

    //! get borrow book summary
    getSummary: builder.query<{ data: IBook[] }, null>({
      query: () => ({
        url: `/borrow`,
        method: "GET",
      }),
      providesTags: ["data"],
    }),
  }),
});

// api hooks
export const {
  useGetAllBookQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetSummaryQuery,
} = authApi;
