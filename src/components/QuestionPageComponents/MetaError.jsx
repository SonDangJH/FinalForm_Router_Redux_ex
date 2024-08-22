export const MetaError = ({ error, touched }) => {
  if (error && touched)
    return <span className="text-red-400 text-sm font-medium">{error}</span>;
  else return null;
};
