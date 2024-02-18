import dynamic from "next/dynamic";

import BlogList from "@/components/blog-meu-pages/blog-list-v2";

export const metadata = {
  title: 'Blog List V2 || Superio - Job Borad React NextJS Template',
  description:
    'Superio - Job Borad React NextJS Template',
  
}



const index = () => {
  return (
    <>

      <BlogList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });