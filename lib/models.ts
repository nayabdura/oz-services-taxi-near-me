import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

// ---

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  category: { type: String },
  image_url: { type: String },
  meta_title: { type: String },
  meta_description: { type: String },
  author: { type: String, default: 'Oz Services' },
  published: { type: Number, default: 0 },
  featured: { type: Number, default: 0 },
  read_time: { type: Number, default: 5 },
  views: { type: Number, default: 0 },
}, { timestamps: true });

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

// ---

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  date: { type: String },
  time: { type: String },
  service_type: { type: String, default: 'standard' },
  passengers: { type: Number, default: 1 },
  notes: { type: String },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

// ---

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'unread' },
}, { timestamps: true });

export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

// ---

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  rating: { type: Number, default: 5 },
  message: { type: String, required: true },
  avatar: { type: String },
  published: { type: Number, default: 1 },
}, { timestamps: true });

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

// ---

const PricingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  unit: { type: String, default: 'per ride' },
  description: { type: String },
  features: { type: String }, // Stored as JSON string to match prior SQLite behaviour
  popular: { type: Number, default: 0 },
  sort_order: { type: Number, default: 0 },
}, { timestamps: true });

export const Pricing = mongoose.models.Pricing || mongoose.model('Pricing', PricingSchema);

// ---

const FleetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String },
  description: { type: String },
  image_url: { type: String },
  active: { type: Number, default: 1 },
  sort_order: { type: Number, default: 0 },
}, { timestamps: true });

export const Fleet = mongoose.models.Fleet || mongoose.model('Fleet', FleetSchema);
