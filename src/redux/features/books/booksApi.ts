import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //! create function
    addBook: builder.mutation({
      query: (data) => ({
        url: `/api/v1/books`, //have to change
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),

    //! get function
    getAllBook: builder.query({
      query: () => ({
        url: `/api/v1/books`,
        method: "GET",
      }),
      providesTags: ["data"],
    }),

    //!get single with id function
    getBookById: builder.query({
      query: (id: string) => ({
        url: `/api/v1/books/${id}`,
        method: "GET",
      }),
      providesTags: ["data"],
    }),

    //!Update function
    updateBook: builder.mutation({
      query: (data) => ({
        url: `/api/v1/books/${data}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),

    //! Delete function
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["data"],
    }),
  }),
});

// api hooks
export const {
  useGetAllBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = authApi;
