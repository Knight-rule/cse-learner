import Playground from "@/components/Playground";

export const metadata = {
  title: "Code Playground - CSE Learner",
  description: "Write and run code directly in the browser",
};

export default function PlaygroundPage() {
  return (
    <div className="dark:bg-dark-900 min-h-screen">
      <Playground />
    </div>
  );
}
