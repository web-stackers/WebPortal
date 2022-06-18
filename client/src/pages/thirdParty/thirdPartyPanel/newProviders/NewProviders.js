import NewProviderlist from "./NewProviderlist";

// display the list of new registered providers
const NewProviders = ({ id }) => {
  const thirdPartyId = id;

  return (
    <>
      <div>
        <NewProviderlist id={thirdPartyId} />
      </div>
    </>
  );
};

export default NewProviders;
