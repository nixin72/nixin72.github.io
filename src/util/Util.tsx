import { useMediaQuery } from "react-responsive";

export function zipcase(preds: boolean[], thens: any[]) {
  if (preds.length !== thens.length) {
    throw Error("Arrays must be the same length");
  }
  for (let i = 0; i < preds.length; i++) {
    if (preds[i]) {
      return thens[i];
    }
  }
}

export function useScreenSizes() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });

  return {
    isDesktopOrLaptop, isBigScreen, isTabletOrMobile
  }
}

export function useContentWidth(): { narrow: string, wide: string } {
  const { isTabletOrMobile, isDesktopOrLaptop, isBigScreen } = useScreenSizes();
  if (isTabletOrMobile) return { narrow: "90%", wide: "95%" };
  if (isDesktopOrLaptop) return { narrow: "60%", wide: "80%" } ;
  if (isBigScreen) return { narrow: "50%", wide: "60%" };
  return { narrow: "60%", wide: "80%" }
}

export function useFontSizes() {
  const { isDesktopOrLaptop, isBigScreen, isTabletOrMobile } = useScreenSizes();
  const sizes = [ isTabletOrMobile, isDesktopOrLaptop, isBigScreen ];

  return {
    h1fs: zipcase(sizes, ["1.3rem", "4rem", "4rem"]),
    h2fs: zipcase(sizes, ["1.1rem", "3rem", "3rem"]),
    defaultfs: zipcase(sizes, ["1", "1.5", "1.5"])
  }
}