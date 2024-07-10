interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function page({ searchParams }: PageProps) {
  const { id } = searchParams;
  return <div>{id}</div>;
}

export default page;
