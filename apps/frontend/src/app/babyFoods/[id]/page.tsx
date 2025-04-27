const babyFoodDetail = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div>babyFoodDetail</div>
      <div>
        <p>id: {params.id}</p>
      </div>
    </>
  );
};

export default babyFoodDetail;
