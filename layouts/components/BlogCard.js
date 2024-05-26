import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

const BlogCard = ({ post }) => {
  const author = post.author ? post.author : "Unknown";

  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="object-cover w-full h-full rounded-t"
          />
        )}
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {post.title}
        </Typography>
        <Typography>{post.content}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
      <Link href={`/posts/${post._id}`}>
          <Button color="blue" className="text-sm font-medium">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
