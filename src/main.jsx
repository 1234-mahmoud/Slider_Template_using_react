import { createRoot } from "react-dom/client";
import Slider from "./slider_tem2.jsx";


const imageData = [
  "https://via.placeholder.com/600x300?text=1",
  "https://via.placeholder.com/600x300?text=2",
  "https://via.placeholder.com/600x300?text=3",
  "https://via.placeholder.com/600x300?text=4",
  "https://via.placeholder.com/600x300?text=5",
];
createRoot(document.getElementById("root")).render(
 <Slider
      layout="flex"
      gap={30}
      breakpoints={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      transition={{ duration: "0.8s", easing: "ease" }}
      data={imageData}
      autoPlay={true}
      autoPlayInterval={4000}
      loop={true}
    />
);
