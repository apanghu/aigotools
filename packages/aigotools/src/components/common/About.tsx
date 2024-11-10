import SocialIcon from "@/components/ui/social-icons";
import Image from "@/components/ui/Image";
interface AboutProps {}
export default function About() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {"dict.about.title"}
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {/* {siteMetadata.avatar && (
              <Image
                src={siteMetadata.avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )} */}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
              {"siteMetadata.author"}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">
              {"siteMetadata.occupation"}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {"siteMetadata.company"}
            </div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${"siteMetadata.email"}`} />
              <SocialIcon kind="github" href={"siteMetadata.github"} />
              <SocialIcon kind="linkedin" href={"siteMetadata.linkedin"} />
              <SocialIcon kind="x" href={"siteMetadata.x"} />
            </div>
          </div>
          <div
            className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2"
            dangerouslySetInnerHTML={{ __html: "siteMetadata.children" }}
          ></div>
        </div>
      </div>
    </>
  );
}
