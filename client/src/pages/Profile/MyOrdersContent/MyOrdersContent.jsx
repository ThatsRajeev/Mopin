import "./MyOrdersContent.css"

const MyOrdersContent = () => {
  return (
    <div className="component">
      <img className="default-img" src="https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/_0d3b19ad-bc5d-40ed-923a-ce2caabe524e+(1).avif" />
      <h2 className="coming-soon">You don't have any orders!</h2>
      <button className="explore-btn">Explore Dishes</button>
    </div>
  )
};

export default MyOrdersContent;
