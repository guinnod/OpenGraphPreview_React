# OpenGraphPreview Component for React

This React component fetches and displays Open Graph metadata (title, description, and image) from URLs provided to it. It is designed to work within React applications and makes use of a CORS proxy server to bypass Cross-Origin Resource Sharing (CORS) restrictions.

## Features

- Fetches and displays Open Graph metadata including title, description, and image.
- Retries the fetch operation up to three times in case of errors.
- Utilizes TailwindCSS for styling and skeleton loading screens during data fetch.

## Technologies Used

- React.js
- TypeScript
- Axios for HTTP requests
- TailwindCSS for styling
- CORS proxy to avoid CORS restrictions

## Usage
Configure proxyUrl in your application:
- Add proxyUrl to your configuration file pointing to your CORS proxy server. For example, in `src/config/site.ts`, add:
```javascript
export const proxyUrl = "http://localhost:8080/proxy";
```
Import and use the `OpenGraphPreview` component in your React application by passing the URL as a prop:

```jsx
import { OpenGraphPreview } from "./path/to/OpenGraphPreview";

const App = () => {
    return (
        <div>
            <OpenGraphPreview url="https://example.com" />
        </div>
    );
};

export default App;
```
## Example
![Screenshot 1](https://raw.githubusercontent.com/guinnod/OpenGraphPreview_React/main/photo_2024-05-05%2017.52.52.jpeg)
