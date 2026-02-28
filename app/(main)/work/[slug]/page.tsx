import { ProjectsProvider } from "@/app/context/projectsContext";
import { SingleProjectProvider } from "@/app/context/singleProjectContext";
import SingleProject from "@/app/ui/main/singleProject/SingleProject";
import {
  getCategories,
  getPostsData,
  getSinglePost,
} from "@/lib/actions";

const SingleProjectPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const projectData = await getSinglePost(slug);
  const allProjects = await getPostsData();
  const categories = await getCategories();

  console.log("Project Data:", projectData);
  console.log("All Projects:", allProjects);
  console.log("Categories:", categories);

  return (
    <ProjectsProvider
      initialProjects={allProjects}
      initialCategories={categories}
    >
      <SingleProjectProvider projectData={projectData}>
        <SingleProject />
      </SingleProjectProvider>
    </ProjectsProvider>
  );
};

export default SingleProjectPage;
