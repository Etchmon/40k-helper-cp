import { Helmet, HelmetData } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

export const Head = ({
  title = "",
  description = "A digital interface to assist your Warhammer 40k Combat Patrol games",
}: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | Warhammer 40k Combat Patrol` : undefined}
      defaultTitle="Combat Patrol"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
