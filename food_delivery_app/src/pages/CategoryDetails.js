import { useParams } from "react-router-dom";
const CategoryDetailsPage = () => {
  const params = useParams();
  return (
    <>
      <h1>{params.categoryId}</h1>
    </>
  );
};
export default CategoryDetailsPage;
