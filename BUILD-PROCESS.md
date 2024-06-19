# Property Pulse

React project base on the [Next.js From Scratch 2024](https://www.udemy.com/course/nextjs-from-scratch/) course by [Brad Traversy](https://www.traversymedia.com/).

## Knowledge applied:

- App Routing:
  - File-system based router.
  - page file conventions in nested routes: `layout.jsx`, `page.jsx`, `loading.jsx`, `error.jsx`, etc.
  - custom not found and loading page.
- NextJS api routes
  - Handle http requests
- Server vs client components
- Dynamic vs static render on production
- Server actions
  - apply server actions on client and server side
  - search and sort feature using server actions
- NextJS components: `Link`, `Image`.
  - setup responsive Image components to better performance.
- MongoDB
  - Cluster configuration
  - Optimize mongoose connection setup to avoid redundant connections.
  - Mongoose: data modeling and fetching
  - Mongoose paginate v2: configure plugin
  - Optimize queries
- Authentication with NextAuth
  - Configure providers and callbacks
  - User authentication and authorization on client and server side
- Configure and consuming Cloudinary api to store and provide optimized images
  - Handle image buffers to upload with `upload_stream` cloudinary api
- Create a map with MapBox service

## Planning:

### Requirements and features:

- Users of the app are people who wether wants to search properties for rent or listing their properties to potential tenants
- The home page will have a form to quickly search by location and properties type. Also section of featured properties and the most recent listings
- Users can access to all listed properties paginated and sortable by creation date, with the search form at top
- Anyone with a Google account can sign up to have a profile with its email, name and photo
- Only user with a profile can bookmark properties, send messages to properties owners, add or edit their own properties
- Signed in users will have access to their profile, bookmarks, messages and listings on the navbar
- Through a notification icon that show how many are unread

### Features Categories:

- Properties
- Property
- Listings
- Bookmark property
- Show bookmarks
- Add property
- Edit property
- Messages
- Authentication

### Technology decisions:

- Routing: NextJS app router
- Styling: tailwind
- UI state management: remote and react context
- Form management: react hook form
- Database: MongoDB
- Image storage: Cloudinary

## Things to check

- Check if a api route could be replace by an action
- Login page with email sign in
- Change messages design
- Change profile and listings design
- Error handling
- Optimize images

## New features to implement
