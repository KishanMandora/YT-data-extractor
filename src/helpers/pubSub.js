function pubSub() {
  let observer = () => {};

  const subscribe = (fn) => {
    observer = fn;
  };

  const publish = (data) => {
    observer(data);
  };

  return { subscribe, publish };
}

export const toastPubSub = pubSub();
