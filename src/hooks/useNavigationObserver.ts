import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

const errorMessage = "Please ignore this error.";

const throwFakeErrorToFoolNextRouter = () => {
  // eslint-disable-next-line no-throw-literal
  throw errorMessage;
};

const rejectionHandler = (event: PromiseRejectionEvent) => {
  if (event.reason === errorMessage) {
    event.preventDefault();
  }
};
interface Props {
  shouldStopNavigation: boolean;
  onNavigate: () => void;
}

const useNavigationObserver = ({ shouldStopNavigation, onNavigate }: Props) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const nextPath = useRef("");
  const navigationConfirmed = useRef(false);

  const killRouterEvent = useCallback(() => {
    router.events.emit("routeChangeError", "", "", { shallow: false });
    throwFakeErrorToFoolNextRouter();
  }, [router]);

  useEffect(() => {
    navigationConfirmed.current = false;

    const onRouteChange = (url: string) => {
      if (currentPath !== url) {
        window.history.pushState(null, "", router.basePath + currentPath);
      }

      if (
        shouldStopNavigation &&
        url !== currentPath &&
        !navigationConfirmed.current
      ) {
        nextPath.current = url.replace(router.basePath, "");
        onNavigate();
        killRouterEvent();
      }
    };

    router.events.on("routeChangeStart", onRouteChange);
    window.addEventListener("unhandledrejection", rejectionHandler);

    return () => {
      router.events.off("routeChangeStart", onRouteChange);
      window.removeEventListener("unhandledrejection", rejectionHandler);
    };
  }, [
    currentPath,
    killRouterEvent,
    onNavigate,
    router.basePath,
    router.events,
    shouldStopNavigation,
  ]);

  const confirmNavigation = () => {
    navigationConfirmed.current = true;
    router.push(nextPath.current);
  };

  return confirmNavigation;
};

export { useNavigationObserver };
