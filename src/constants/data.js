import {
  AiOutlineAppstore,
  AiTwotoneHeart,
  AiOutlineRise,
  AiFillFolderAdd,
  AiFillStar,
} from "react-icons/ai";

export const links = [
  {
    name: "Inspiration",
    url: "/shots/",
    sublinks: [
      {
        title: "Explore Design Work",
        url: "/shots/popular",
        desc: "Trending designs to inspire you",
        icon: AiOutlineAppstore,
        color: "#724e91",
      },
      {
        title: "New & NoteWorthy",
        url: "/shots/recent",
        desc: "Up-and-coming designers",
        icon: AiTwotoneHeart,
        color: "#e54f6d",
      },
      {
        title: "Playoffs",
        url: "#",
        desc: "Work designers are reffing on",
        icon: AiTwotoneHeart,
        color: "#74c4ba",
      },
      {
        title: "Blog",
        url: "/stories",
        desc: "Interviews, tutorials, and more",
        icon: AiTwotoneHeart,
        color: "#f8c630",
      },
    ],
  },
  {
    name: "Find Work",
    url: "#",
    sublinks: [
      {
        title: "Job Board",
        url: "#",
        desc: "Find your dream design job",
        icon: "",
      },
      {
        title: "Freelance Projects",
        url: "#",
        desc: "An Exclusive list for contract work",
        icon: "",
      },
      {
        title: "Want freelance design projects?",
        url: "#",
        desc: "Get new leads in your inbox everyday",
        icon: "",
      },
      {
        title: "Personalize your profile with video",
        url: "#",
        desc: "Introduce yourself to new clients with Pitch",
        icon: "",
      },
    ],
  },
  {
    name: "Learn Design",
    url: "#",
    sublinks: [
      {
        title: "Certified Product Design Course",
        url: "#",
        desc: "Learn product design in just 12 weeks...",
        icon: "",
      },
      {
        title: "Live Workshops",
        url: "#",
        desc: "Level up your skills with our interactive workshops...",
        icon: "",
      },
    ],
  },
  {
    name: "Go Pro",
    url: "#",
    sublinks: [],
  },
  {
    name: "Marketplace",
    url: "#",
    sublinks: [
      {
        title: "Discover",
        url: "#",
        desc: "A marketplace of digital assets...",
        icon: "",
      },
      {
        title: "Graphics",
        url: "#",
        desc: "Icons, Illustrations, Patterns, Textures...",
        icon: "",
      },
      {
        title: "Fonts",
        url: "#",
        desc: "Display, Script, Sans Serif, Serif...",
        icon: "",
      },
      {
        title: "Templates",
        url: "#",
        desc: "Mock Ups, Social Media, Presentations...",
        icon: "",
      },
      {
        title: "3D",
        url: "#",
        desc: "Characters, Objects, Textutres...",
        icon: "",
      },
      {
        title: "Themes",
        url: "#",
        desc: "WordPress, Shopify, Bootstrap, HTML5...",
        icon: "",
      },
      {
        title: "Add Ons",
        url: "#",
        desc: "Procreate, Affinity, Photoshop, InDesign...",
        icon: "",
      },
    ],
  },
];

export const profileLink = {
  name: "profile",
  personsName: "Younes Zahzouh",
  picture:
    "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  url: "#",
  sublinks: [
    {
      title: "Profile",
      url: "#",
    },
    {
      title: "Edit Profile",
      url: "#",
    },
    {
      title: "Edit Work Preferences",
      url: "#",
    },
    {
      title: "My Boosted Shots",
      url: "#",
      icon: AiOutlineRise,
    },
    {
      title: "My Likes",
      url: "#",
      icon: AiTwotoneHeart,
    },
    {
      title: "My Collections",
      url: "#",
      icon: AiFillFolderAdd,
    },
    {
      title: "Go Pro",
      url: "#",
      icon: AiFillStar,
    },{
      title: "Sign out",
      url: "/logout",
    },
  ],
};
