import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

import {
  BlogGallery,
  IBlogGalleryProps,
} from "../src/components/blog/BlogGallery";

import { Meta } from "../src/components/Meta";
import Layout from "../src/components/Layout";
import Intro from "../src/components/blog/Intro";
import { IPaginationProps } from "../src/components/blog/Pagination";
import { Config } from "../src/utils/Config";
import { getAllPosts } from "../src/utils/Content";

const Blog = (props: IBlogGalleryProps) => (
  <Layout>
    <main>
      <Meta
        title="Made with Next.js, TypeScript, ESLint, Prettier, PostCSS, Tailwind CSS"
        description={Config.description}
      />
      <Head>
        <title>Blog on Dev Ops and website perfomance monitoring</title>
      </Head>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex align-content-between flex-col md:flex-row items-center">
          <div className="flex flex-col w-full justify-center items-start text-center md:text-left">
            <Intro />
            <BlogGallery posts={props.posts} pagination={props.pagination} />
          </div>
        </div>
      </div>
    </main>
  </Layout>
);

export const getStaticProps: GetStaticProps<IBlogGalleryProps> = async () => {
  const posts = getAllPosts(["title", "date", "slug"]);
  const pagination: IPaginationProps = {};

  if (posts.length > Config.pagination_size) {
    pagination.next = "/page2";
  }

  return {
    props: {
      posts: posts.slice(0, Config.pagination_size),
      pagination,
    },
  };
};

export default Blog;
