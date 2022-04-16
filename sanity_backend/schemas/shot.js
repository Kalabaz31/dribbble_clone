export default {
  name: "shot",
  title: "Shot",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "about",
      title: "About",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: 'array',
      of: [{type: 'reference', to: [{ type: "category" }]}],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "postedBy",
      title: "PostedBy",
      type: "reference",
      to: [{ type: "user" }],
    },
    {
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [{ type: 'save' }],
    },{
      name: "like",
      title: "Like",
      type: "array",
      of: [{type: 'reference', to: [{ type: "user" }]}],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "comment" }],
    },
  ],
};
