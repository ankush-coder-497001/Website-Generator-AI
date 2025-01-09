import { useContext, useEffect, useRef, useState } from "react";
import "./InputUI.css";
import createStars from '../../CreateStars';
import Profile from "./Profile";
import {Context} from '../../ContextProvider'
import { GenerateWebsite } from "../../ApiHandler";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
const InputUI = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const {LoginUser,setLoginUser,setUserPrompt,setFileName,setFileCode} = useContext(Context);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('BuildYourOwn'))
    setLoginUser(user);
    createStars();
  }, []);

  // Prompt array with example prompts
  const prompt = [
    {
      prompt: "Design a modern developer portfolio that seamlessly integrates advanced animations and dynamic interactivity. Include a visually striking hero section with the developer's photo, name, title, and a tagline in bold typography. Add a 'Skills' section with animated progress bars or circular indicators, and a 'Projects' section featuring hover-responsive cards that expand to show project details. Implement smooth scrolling and transitions for navigation, and a contact form with real-time validation, styled using gradients and modern CSS techniques. Ensure the portfolio is fully responsive for all devices with a cohesive color palette and accessible design.",
      Dprompt: "Developer Portfolio"
    },
    {
      prompt: "Create a creative designer portfolio with an engaging, interactive layout. Include a gallery section with draggable sliders, allowing users to explore featured works effortlessly. Implement smooth section transitions and a 'Case Studies' section detailing problem-solving processes with collapsible entries. Add a testimonial carousel with sliding animations, styled with a cohesive visual theme that showcases the designer's aesthetic. Ensure the portfolio is fully responsive and highlights the designer's skills through modern typography and color schemes.",
      Dprompt: "Designer Portfolio"
    },
    {
      prompt: "Develop a minimalist portfolio for full-stack developers with a clean, professional design. Use a hero section with a typewriter animation for the tagline and a 'Technologies' section featuring animated icons. Add a 'Work Experience' timeline with hover-expandable entries and a contact form that triggers a stylish confirmation modal on submission. Keep the design minimal yet dynamic, utilizing responsive layouts and consistent typography.",
      Dprompt: "Full-Stack Portfolio"
    },
    {
      prompt: "Design a vibrant UI/UX designer portfolio with smooth navigation and captivating visuals. Incorporate a fixed navbar for seamless scrolling, a 'Case Studies' section displayed in a masonry grid layout, and hover-activated animations for icons. Add a 'Services' section with gradient-styled buttons linking to individual service pages. Use modern CSS techniques for responsiveness and accessibility, ensuring the portfolio reflects the designer's creativity and technical expertise.",
      Dprompt: "UI/UX Portfolio"
    },
    {
      prompt: "Create a 3D-themed portfolio for game developers, highlighting their skills and projects. Include interactive 3D assets using WebGL or similar frameworks, and gameplay videos with hover-over previews. Add a 'Skills' section using radial progress indicators and a glowing 'Download Resume' button to enhance engagement. Design the portfolio to be immersive and responsive, with a color scheme that resonates with gaming aesthetics.",
      Dprompt: "Game Developer Portfolio"
    },
    {
      prompt: "Design an AI engineer portfolio with a focus on showcasing cutting-edge projects. Include an animated hero section displaying key achievements and projects, a 'Publications' section with expandable abstracts, and a 'Demos' section embedding interactive AI models. Add a 'Contact' section featuring a map highlighting the engineer's location. Use sleek CSS and responsive design to ensure the portfolio reflects innovation and technical proficiency.",
      Dprompt: "AI Engineer Portfolio"
    },
    {
      prompt: "Create a writer's portfolio with a professional and engaging layout. Design a blog section styled like a news portal, featuring hover effects for article previews and a 'Published Works' section with embedded links to external publications. Add a subscription form with validation and email confirmation alerts. Use elegant typography and responsive CSS to enhance readability and aesthetics.",
      Dprompt: "Writer Portfolio"
    },
    {
      prompt: "Design a photographer's portfolio with a focus on showcasing stunning visuals. Include a responsive image gallery with a lightbox effect, a 'Services' section featuring pricing cards with hover animations, and a 'Testimonials' section with a parallax background. Use modern CSS techniques to ensure smooth transitions and an immersive user experience.",
      Dprompt: "Photography Portfolio"
    },
    {
      prompt: "Develop a vibrant illustrator's portfolio that highlights creative artwork. Include a carousel for featured illustrations, a 'Tools' section listing software and tools with animated tooltips, and a 'Custom Artwork' inquiry form with dropdown options. Add an interactive FAQ section styled with animations. Use a bright and playful color palette to reflect the illustrator's artistic personality.",
      Dprompt: "Illustrator Portfolio"
    },
    {
      prompt: "Create a personal website for content creators that emphasizes dynamic and interactive elements. Include a hero video section with an introduction, embedded social media posts, and a 'Portfolio' section with filterable categories. Add a 'Contact' section with direct links to social media handles styled with hover animations. Ensure a responsive layout and cohesive styling to showcase the content creator's versatility.",
      Dprompt: "Content Creator Portfolio"
    },
    {
      prompt: "Design an interactive portfolio for frontend developers to demonstrate their skills and projects. Include a dynamic hero section with a coded animation (e.g., a CSS logo spinner), a 'Projects' section with collapsible cards revealing detailed descriptions, and a contact form with autocomplete suggestions. Use advanced CSS and JavaScript to create a polished, responsive experience.",
      Dprompt: "Frontend Portfolio"
    },
    {
      prompt: "Create a professional corporate portfolio to highlight achievements and services. Include an animated stats counter to showcase key metrics, a 'Services' section with clickable icons leading to detailed pages, and a 'Clients' section featuring a scrolling logo carousel. Use clean, corporate-styled CSS for a polished and professional look.",
      Dprompt: "Corporate Portfolio"
    },
    {
      prompt: "Design a clean and minimalist academic portfolio for researchers. Include a 'Publications' section with citation download buttons, a 'Grants & Awards' timeline styled with animations, and a custom-built search bar for browsing specific works. Ensure the design is accessible and responsive, with a focus on academic professionalism.",
      Dprompt: "Researcher Portfolio"
    },
    {
      prompt: "Create a trendy influencer portfolio that showcases their social media presence. Include embedded TikTok and Instagram videos, a 'Collaborations' section with brand logos and links, and a 'Contact' section featuring an interactive calendar for booking appointments. Use vibrant CSS styling to match the influencer's brand.",
      Dprompt: "Influencer Portfolio"
    },
    {
      prompt: "Design a detailed artist portfolio that emphasizes creativity. Include an interactive gallery with zoom effects, a 'Tools and Mediums' section with animated icons, and a 'Custom Artwork Request' form with step-by-step options. Use modern CSS techniques to create a responsive and visually captivating design.",
      Dprompt: "Artist Portfolio"
    },
    {
      prompt: "Create a modern portfolio for freelancers to showcase services and testimonials. Include a 'Services' section with tiered pricing tables, a client testimonial slider with custom animations, and a 'Get a Quote' form featuring conditional logic. Use elegant CSS styling to ensure a professional and approachable look.",
      Dprompt: "Freelancer Portfolio"
    },
    {
      prompt: "Design an elegant portfolio for product managers to highlight their expertise. Include a 'Case Studies' section detailing completed projects, a 'Tools Used' section with progress bars, and a 'Contact Me' section with an integrated chatbot for quick inquiries. Use clean CSS and responsive layouts for a professional appearance.",
      Dprompt: "Product Manager Portfolio"
    },
    {
      prompt: "Develop a vibrant data scientist portfolio showcasing their skills and projects. Include interactive visualizations like charts and graphs, a 'Projects' section with expandable cards, and a 'Blog' section formatted for readability. Use advanced CSS for responsiveness and accessibility.",
      Dprompt: "Data Scientist Portfolio"
    },
    {
      prompt: "Create a stylish fitness trainer portfolio with dynamic features. Include a 'Workout Plans' section with collapsible daily routines, a 'Transformation Stories' section featuring before-and-after image sliders, and a subscription form for exclusive content. Use bold CSS styling to match the fitness theme.",
      Dprompt: "Fitness Trainer Portfolio"
    }
  ];
  
  
  
  

  // Function to set prompt when a chip is clicked
  const setPrompt = (data) => {
    inputRef.current.value = data; // Set the selected prompt in the input field
  };

  const handleOnInput = () => {
    const input = inputRef.current.value;
  };

  const generateWebsite = () => {
    navigate('/loader/generating')
    const input = inputRef.current.value;
    const propmt = GeneratePropmt(input);
    setUserPrompt(propmt);
    const Uid = LoginUser._id;
    GenerateWebsite({propmt,Uid})
    .then((data)=>{
      navigate('/preview')
      setFileName(data.Htmlfile);
      setFileCode(data.fileCode);
      console.log(data)
    })
    .catch((err)=>{
      navigate('/mainpage')
      toast.error(err)
    })
  };

  const GeneratePropmt =  (data) =>{
  const generatedPropmt = `
 Generate a single, self-contained .html file that includes inline HTML, CSS, and JavaScript. The primary focus should be on creating a visually stunning, modern, and interactive design.  

 Specifications:

1. Design and Visual Appeal:
   - Build a highly aesthetic and responsive website based on the concept: ${data}.
   - Prioritize modern design principles, ensuring vibrant colors, engaging animations, and professional layouts.
   - Use visually engaging mock content, including:
     - High-quality placeholder images (e.g., unsplash.com-style images).
     - Stylish fonts (e.g., Google Fonts) for headings and text.
     - Dummy content such as testimonials, statistics, icons, and cards.
   - Include eye-catching animations such as:
     - Hover effects (buttons glow, links underline, icons bounce, etc.).
     - Smooth transitions for content loading and navigation.
     - Reveal-on-scroll effects for each section.
   - Incorporate subtle background gradients, shadows, and CSS effects (e.g., parallax backgrounds or dynamic elements).

2. Interactive Features:
   - Smooth scrolling for navigation links.
   - Dropdown menus styled with modern aesthetics.
   - Sliders or carousels for showcasing images or content.
   - A dynamic scroll-to-top button with a stylish animation when it appears.
   - Fully validated contact form with real-time field validation, stylish input fields, and a confirmation modal upon submission.

3. Code Structure:
   - All HTML, CSS, and JavaScript must be inline within a single .html file.
   - Use semantic HTML5 for accessibility and structure.
   - Do not use inline styles; instead, rely on classes or IDs for styling.
   - Keep the JavaScript modular and clean, avoiding direct manipulation of  <body> or <div> and also dont select the <body> for the styling .

4. Styling:
   - Use vibrant color schemes with gradients and shadows for depth.
   - Include media queries to ensure the website is responsive and adapts seamlessly to all screen sizes.
   - Maintain consistent spacing and alignment for a polished, professional look.
   - Use CSS animations and transitions for a smooth, fluid experience.

5. Output:
   - Provide only the complete .html file, fully containing all inline HTML, CSS, and JavaScript.
   - Do not include any explanations, comments, or additional text—only clean and cohesive code.
   - The result must look professional and visually impressive, focusing on aesthetic design and functionality.
`

return `${generatedPropmt}`;

  }

  return (
    <>
      <div className="body">
        <div className="container-main">
          <Profile User = {LoginUser} />
          <h1 className="main-head">Build your Own Website</h1>
          <div className="input-group">
            <div className="input-glow"></div>
            <div className="input-container">
              <input
                ref={inputRef}
                onChange={handleOnInput}
                type="text"
                id="ideaInput"
                placeholder="Enter your website idea..."
              />
              <button className="button-main" onClick={generateWebsite}>Generate</button>
            </div>
          </div>
          <div className="suggested-prompts">
            {prompt.map((item, index) => (
              <div key={index} className="prompt-chip" onClick={() => setPrompt(item.prompt)}>
                {item.Dprompt}
              </div>
            ))}
          </div>
        </div>
        <div className="credit">Created by Ankush Kumar Gupta</div>
        <div className="stars"></div>
      </div>
    </>
  );
};

export default InputUI;
