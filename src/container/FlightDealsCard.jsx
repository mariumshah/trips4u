const FlightDealsCard = ({ image, title, name, price, des }) => {
  return (
    <>
      <div className="w-[460px] h-[410px] flex flex-col justify-start gap-2 dealsShadow rounded-b">
        <div className="w-full h-[397px]">
          <img
            src={image}
            alt="images"
            className="w-full h-full object-cover rounded-t"
          />
        </div>
        <div className="w-full h-full flex flex-col justify-center items-start gap-1 px-4">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-[#6E7491] text-base font-medium capitalize">
              {title} <span className="text-[#605DEC]">{name}</span>
            </h1>
            <p className="text-[#6E7491] text-sm font-medium">{price}</p>
          </div>
          <p className="text-[#7C8DB0] text-xs font-normal">
          {des}
          </p>
        </div>
      </div>

    </>
  );
};

export default FlightDealsCard;
