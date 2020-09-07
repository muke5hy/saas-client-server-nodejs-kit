import React from "react";

import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";

import { Content } from "../../src/components/content/Content";
import { Meta } from "../../src/components/Meta";
import Layout from "../../src/components/Layout";
import { getAllPosts, getPostBySlug } from "../../src/utils/Content";
import { markdownToHtml } from "../../src/utils/Markdown";
import { Date } from "../../src/components/Date";
type IPostUrl = {
  slug: string;
};

type IPostProps = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: string;
};

const DisplayPost = (props: IPostProps) => (
  <Layout>
    <Meta
      title={props.title}
      description={props.description}
      post={{
        image: props.image,
        date: props.date,
        modified_date: props.modified_date,
      }}
    />
    <div className="pt-24">
      <div className="container px-3 mx-auto flex align-content-between justify-center flex-col md:flex-row items-center">
        <article className="mb-32">
          <h1 className="text-center font-bold text-3xl text-gray-900">
            {props.title}
          </h1>
          <div className="text-center text-sm mb-8">
            <Date dateString={props.date} />
          </div>

          <Content>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: props.content }}
            />
          </Content>
        </article>
      </div>
    </div>
  </Layout>
);

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({
  params,
}) => {
  const post = getPostBySlug(params!.slug, [
    "title",
    "description",
    "date",
    "modified_date",
    "image",
    "content",
    "slug",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      title: post.title,
      description: post.description,
      date: post.date,
      modified_date: post.modified_date,
      image: post.image,
      content,
    },
  };
};

export default DisplayPost;
