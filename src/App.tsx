import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import "./App.css";
import Child1 from "./pages/Child1";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const App: React.FC = () => {
  // const headlineRef = useRef<HTMLHeadingElement>(null);
  // const subRef = useRef<HTMLParagraphElement>(null);
  // const ctaRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   if (!headlineRef.current || !subRef.current || !ctaRef.current) return;

  //   // Split headline into words
  //   const split = new SplitText(headlineRef.current, { type: "words" });

  //   // Custom scramble words
  //   const scrambleTargets = ["Hacker", "Rank"];

  //   // Make words absolute to avoid layout overlap
  //   // gsap.set(split.words, { position: "absolute", top: 0, left: 0 });

  //   // Timeline for all animations
  //   const tl = gsap.timeline();

  //   // 1️⃣ Fly-in headline words
  //   tl.from(split.words, {
  //     x: "random([-800, 800])",
  //     y: "random([-300, 300])",
  //     opacity: 0,
  //     duration: 1.25,
  //     stagger: 0.15,
  //     ease: "expo.inOut",
  //   });

  //   // 2️⃣ Scramble headline words into custom text
  //   split.words.forEach((word, i) => {
  //     tl.to(
  //       word,
  //       {
  //         duration: 1.5,
  //         scrambleText: { text: scrambleTargets[i], chars: "all", speed: 1 },
  //         ease: "power2.inOut",
  //       },
  //       "-=0.5",
  //     );
  //   });

  //   // 3️⃣ Animate subheadline fade-in
  //   tl.from(subRef.current, { opacity: 0, y: 50, duration: 1.2, ease: "power2.out" }, "+=0.2");

  //   // 4️⃣ Animate CTA button
  //   tl.from(ctaRef.current, { scale: 0, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.5");

  //   return () => split.revert();
  // }, []);
  const [count, setCount] = useState(0);
  const mockApiResponse = {
    page: 1,
    total_pages: 1,
    data: [
      { id: 101, username: "praveen", type: "buy", asset: "silver", amount: "$1,250.50" },
      { id: 102, username: "praveen", type: "sell", asset: "gold", amount: "$3,100.00" },
      { id: 103, username: "praveen", type: "buy", asset: "silver", amount: "$450.25" },
      { id: 104, username: "praveen", type: "buy", asset: "Platinum", amount: "$450.25" },
    ],
  };

  // api end points
  // [https://api.mockdata.com/transactions?username=]
  //  (https://api.mockdata.com/transactions?username=)<username>&page=<pageNumber>

  // the tasks:
  // first we need to check total pages from the api response and then we need to loop through all the pages and get the total amount spent by the user for a specific asset type.
  // currency format is in USD and we need to convert it to number and then sum it up and return the total amount spent by the user for a specific asset type.
  // strict filtering is required for the asset type and username.and only care about the transactions where the type is "buy".

  function getTotalSpent(userName, assetType, asset) {
    let totalSpent = 0;
    let currentPage = 1;
    let totalPage = 1;

    // loop through all the pages and get the total amount spent by the user for a specific asset type.
    while (currentPage <= totalPage) {
      //  const response = await fetch(`https://api.mockdata.com/transactions?username=${userName}&page=${currentPage}`);
      const response = mockApiResponse;
      totalPage = response.total_pages;
      const transaction = response.data || [];

      for (let x of transaction) {
        if (x.type === "buy" && x.asset.toLowerCase() === asset.toLowerCase()) {
          const cleanAmount = x.amount.replace("$", "").replace(/,/g, "");
          const numericAmount = parseFloat(cleanAmount);

          if (!isNaN(numericAmount)) {
            totalSpent += numericAmount;
          }
        }
      }
      currentPage++;
    }
    return totalSpent;
  }

  useEffect(() => {
    const totalSpent = getTotalSpent("praveen", "buy", "silver");
    console.log("Total amount spent by praveen for silver:", totalSpent);
    const totalSpentonPlatinum = getTotalSpent("praveen", "buy", "platinum");
    console.log("Total amount spent by praveen for platinum:", totalSpentonPlatinum);
    const maxWater = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);
    console.log("Maximum water area:", maxWater);
  }, []);

  // find the container with most water
  // const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];

  //function
  function maxArea(height) {
    // Initialize two pointers, one at the beginning and one at the end of the array
    let maxWater = 0;
    // now tow pointer approach
    let left = 0;
    let right = height.length - 1;

    //loop until the two pointers meet
    while (left < right) {
      // Calculate the area of water that can be contained between the two pointers
      const width = right - left; // Calculate the width between the two pointers
      const currentHeight = Math.min(height[left], height[right]); // Find the minimum height between the two pointers // Calculate the area of water that can be contained between the two pointers
      const currentWater = width * currentHeight; // Calculate the area of water that can be contained between the two pointers

      maxWater = Math.max(maxWater, currentWater); // Update the maximum water area if the current area is larger

      if (height[left] < height[right]) {
        left++; // Move the left pointer to the right if the left height is smaller
      } else {
        right--; // Move the right pointer to the left if the right height is smaller or equal
      }

      // return maxWater; // Return the maximum water area found
    }
    return maxWater; // Return the maximum water area found
  }
  const user = useMemo(
    () => ({
      name: "praveen",
      age: "28",
    }),
    [],
  );

  const onSave = useCallback(() => {
    console.log("saved");
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-800 text-white text-center px-4 relative overflow-hidden">
      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">Hacker Rank</h1>

      {/* Optional floating quotes */}
      <div className=" text-white text-2xl font-bold p-6 opacity-100 animate-float">
        You are not behind, you just need to believe in yourself!”
      </div>
      <div className="text-white text-xl font-bold opacity-100 p-10 animate-float">
        “The only limit to our realization of tomorrow is our doubts of today.”
      </div>
      <Child1 user={user} onSave={onSave} />
      <button
        className="border border-white px-3 py-2 rounded-lg cursor-pointer "
        title="can_do_it"
        onClick={() => setCount(count + 1)}
      >
        You Can Do It
      </button>
    </div>
  );
};

export default App;
