import toast from "react-hot-toast";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);

const onInvalid = (text) => {
  toast.error(text, {
    style: {
      background: "hsl(0,100%,90%)",
    },
  });
};

const onSuccess = (text) => {
  toast.success(text, {
    style: {
      background: "hsl(120,100%,90%)",
    },
  });
};

const Loading = ({ height = 5 }) => {
  return (
    <div
      className={`inline-block h-${height} w-${height} animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
      role="status"
    />
  );
};

const CreationDate = ({ date }) => {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" />
    </div>
  );
};
export { onInvalid, onSuccess, Loading, CreationDate };
