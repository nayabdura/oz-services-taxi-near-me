import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

// Inject auth token automatically
api.interceptors.request.use(config => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("adminToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Booking APIs
export const createBooking = (data: object) => api.post("/bookings", data);
export const getBookings = () => api.get("/bookings");
export const updateBookingStatus = (id: string, status: string) => api.put(`/bookings/${id}`, { status });
export const deleteBooking = (id: string) => api.delete(`/bookings/${id}`);

// Blog APIs
export const getBlogs = (params?: object) => api.get("/blogs", { params });
export const getBlogBySlug = (slug: string) => api.get(`/blogs/${slug}`);
export const getAllBlogsAdmin = () => api.get("/blogs/admin/all");
export const createBlog = (data: object) => api.post("/blogs", data);
export const updateBlog = (id: string, data: object) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id: string) => api.delete(`/blogs/${id}`);

// Pricing APIs
export const getPricing = () => api.get("/pricing");
export const createPricing = (data: object) => api.post("/pricing", data);
export const updatePricing = (id: string, data: object) => api.put(`/pricing/${id}`, data);
export const deletePricing = (id: string) => api.delete(`/pricing/${id}`);

// Testimonial APIs
export const getTestimonials = () => api.get("/testimonials");
export const createTestimonial = (data: object) => api.post("/testimonials", data);
export const getAllTestimonialsAdmin = () => api.get("/testimonials/admin/all");
export const approveTestimonial = (id: string, isApproved: boolean) => api.put(`/testimonials/${id}`, { isApproved });
export const deleteTestimonial = (id: string) => api.delete(`/testimonials/${id}`);

// Contact & Auth
export const sendContact = (data: object) => api.post("/contact", data);
export const login = (data: object) => api.post("/auth/login", data);
export const getMe = () => api.get("/auth/me");

export default api;
