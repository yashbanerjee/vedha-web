"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DotGridBackgroundProps extends React.ComponentPropsWithoutRef<"div"> {
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
  logoOpacity?: number;
  backgroundOpacity?: number;
  animationDuration?: number;
}

export function DotGridBackground({
  dotColor = "#e5ff00",
  dotSize = 4,
  spacing = 24,
  logoOpacity = 1,
  backgroundOpacity = 0.15,
  animationDuration = 2000,
  className,
  ...props
}: DotGridBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameRef = React.useRef<number>();
  const dotsRef = React.useRef<Array<{ x: number; y: number; targetOpacity: number; currentOpacity: number; isLogo: boolean; normalizedY: number }>>([]);
  const loadProgressRef = React.useRef(0);
  const timeRef = React.useRef(0);
  const svgPathRef = React.useRef<Path2D | null>(null);
  const mouseRef = React.useRef({ x: 0, y: 0 });

  const hexToRgb = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "").trim();
    const num = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
    return [
      ((num >> 16) & 255) / 255,
      ((num >> 8) & 255) / 255,
      (num & 255) / 255,
    ];
  };

  const dotRgb = React.useMemo(() => hexToRgb(dotColor), [dotColor]);

  // Mouse tracking
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // SVG path data from the logo
  const svgPathData = "M29.1639 0C30.5909 2.52252 30.5909 2.52252 31.1371 3.49099C31.5625 4.24319 31.9936 4.99201 32.4264 5.7399C32.9807 6.6981 33.5293 7.65963 34.0777 8.62129C34.2488 8.92131 34.4202 9.22117 34.5917 9.52108C35.1051 10.419 35.6177 11.3175 36.1259 12.2185C36.5523 12.9739 36.985 13.7255 37.4194 14.4762C37.8747 15.2632 38.3274 16.0514 38.7764 16.8421C39.0097 17.2528 39.2431 17.6628 39.4879 18.0666C39.5398 18.1536 39.5399 18.1536 39.5929 18.2423C39.6792 18.3864 39.767 18.5296 39.8551 18.6726C39.9815 18.9829 39.9412 19.1354 39.8662 19.4595C39.7641 19.6793 39.7641 19.6793 39.6345 19.8966C39.5858 19.9794 39.5371 20.0623 39.4869 20.1477C39.4071 20.2808 39.407 20.2808 39.3256 20.4167C39.2117 20.6099 39.0981 20.8032 38.9844 20.9966C38.9247 21.0981 38.8648 21.1996 38.8032 21.3042C38.4857 21.8453 38.1787 22.3926 37.8707 22.9392C37.8135 23.0405 37.7564 23.1417 37.6976 23.2459C37.5861 23.4434 37.4746 23.6409 37.3632 23.8384C37.0683 24.361 36.7727 24.8832 36.4771 25.4054H36.2988C36.2559 25.3282 36.256 25.3282 36.2122 25.2495C35.6068 24.1609 34.9942 23.077 34.3699 21.9994C33.8162 21.0436 33.2689 20.0841 32.7217 19.1245C32.4427 18.6354 32.1633 18.1466 31.8841 17.6577L30.7135 15.6081C30.6021 15.4131 30.4906 15.218 30.3792 15.023C30.0993 14.5328 29.8194 14.0426 29.5398 13.5523C29.0027 12.6106 28.464 11.67 27.9208 10.732C27.2778 9.62126 26.6462 8.50405 26.0157 7.38598C25.9406 7.2529 25.9406 7.25288 25.864 7.11712C25.8304 7.00917 25.7967 6.90123 25.7621 6.79001C25.6723 6.61348 25.6723 6.61345 25.5072 6.48649C25.0523 6.38577 24.5955 6.4015 24.1323 6.4066C23.989 6.40589 23.8457 6.40495 23.7025 6.4037C23.3134 6.40111 22.9245 6.40234 22.5356 6.40432C22.1291 6.40572 21.7225 6.40362 21.3161 6.40185C20.5464 6.39904 19.7766 6.39944 19.0068 6.40097C18.1306 6.40256 17.2542 6.40052 16.378 6.39824C14.5753 6.39364 12.7726 6.39357 10.9699 6.3964C11.0084 6.46387 11.047 6.53134 11.0867 6.60086C11.2313 6.85411 11.376 7.10739 11.5206 7.36064C11.5829 7.4697 11.6452 7.57878 11.7076 7.68784C12.0342 8.25976 12.3608 8.83169 12.6871 9.40387C13.2102 10.3211 13.7351 11.2372 14.2643 12.1509C14.7476 12.9859 15.2242 13.8247 15.6983 14.6651C16.1681 15.4979 16.6437 16.3272 17.123 17.1544C17.4983 17.8027 17.8682 18.4541 18.236 19.1067C18.5674 19.6939 18.9039 20.2781 19.2419 20.8614C19.7165 21.681 20.186 22.5033 20.6521 23.3277C20.6973 23.4075 20.6973 23.4076 20.7435 23.489C21.0866 24.0956 21.4274 24.7034 21.7614 25.3153C22.1027 24.918 22.3447 24.4826 22.5975 24.0259C22.6925 23.8561 22.7877 23.6864 22.8829 23.5167C22.9326 23.428 22.9823 23.3393 23.0336 23.2479C23.2957 22.7828 23.5623 22.3204 23.8295 21.8581C23.8819 21.7672 23.9344 21.6764 23.9886 21.5827C24.3221 21.0064 24.6587 20.432 25.0022 19.8616C25.1519 19.6121 25.2939 19.3627 25.4181 19.0991C25.6122 19.2821 25.7464 19.4546 25.8724 19.6903C25.9066 19.7537 25.941 19.8172 25.9763 19.8825C26.0128 19.9511 26.0493 20.0196 26.087 20.0901C26.1672 20.2382 26.2476 20.3862 26.328 20.5342L26.4532 20.7646C26.6464 21.1167 26.8456 21.465 27.0457 21.8131C27.086 21.8832 27.1263 21.9533 27.1679 22.0256C27.4461 22.5087 27.7253 22.9913 28.0043 23.474C28.0558 23.5632 28.1074 23.6524 28.1605 23.7443C28.2127 23.8346 28.2649 23.9249 28.3186 24.0178C29.1146 25.3959 29.9035 26.7782 30.6856 28.1644C31.6095 29.8553 31.6095 29.8553 32.6195 31.4921C32.7313 31.7117 32.7313 31.7117 32.7208 31.8881C32.6173 32.1303 32.4956 32.3545 32.3652 32.5831C32.2786 32.7355 32.2786 32.7355 32.1903 32.891C32.1273 33.0009 32.0642 33.1108 32.0011 33.2207C31.9365 33.3341 31.8719 33.4474 31.8074 33.5607C31.3897 34.2935 30.9682 35.0241 30.5463 35.7545C30.4696 35.8876 30.4696 35.8876 30.3913 36.0233C30.1727 36.4024 29.9531 36.7807 29.7272 37.1555C29.6926 37.2139 29.658 37.2723 29.6224 37.3324C29.5346 37.4802 29.4456 37.6272 29.3565 37.7741C29.2293 38.0741 29.2316 38.1632 29.3423 38.4685C29.4709 38.7395 29.6142 39.0007 29.7604 39.2623C29.8036 39.3408 29.847 39.4194 29.8915 39.5002C30.4382 40.4855 31.0042 41.4595 31.5719 42.4324L31.7406 42.7214C32.0702 43.2861 32.4004 43.8505 32.7313 44.4144C33.0821 43.8547 33.4164 43.2867 33.7458 42.714C33.7998 42.6204 33.8538 42.5267 33.9094 42.4303C34.7133 41.0341 35.5126 39.6352 36.3043 38.232C36.7311 37.4758 37.1643 36.7234 37.5992 35.9719C38.1538 35.013 38.7029 34.0508 39.2516 33.0885C39.5306 32.5994 39.8099 32.1105 40.0892 31.6216C40.2007 31.4264 40.3122 31.2313 40.4236 31.036C41.0925 29.8649 41.0925 29.8649 41.2598 29.572C41.3711 29.3771 41.4824 29.1823 41.5936 28.9875C41.8755 28.4938 42.1576 28.0002 42.4397 27.5067C42.9532 26.6085 43.466 25.7098 43.9743 24.8086C44.4012 24.0523 44.8343 23.3 45.2692 22.5485C45.8807 21.4914 46.4854 20.4303 47.0903 19.3694C47.7398 18.2304 48.3897 17.0918 49.0469 15.9572C49.4995 15.1754 49.9463 14.3905 50.3902 13.6036C50.8844 12.7277 51.3835 11.8549 51.8873 10.9846C52.7652 9.46775 53.631 7.94392 54.4932 6.41796C55.3534 4.89552 56.2213 3.37749 57.0924 1.86145C57.4478 1.24263 57.798 0.62114 58.1494 0L80 0C79.8731 0.320481 79.7517 0.591512 79.5851 0.887528C79.5151 1.01233 79.515 1.01235 79.4437 1.13968C79.3936 1.22811 79.3436 1.31654 79.292 1.40766C79.24 1.5001 79.1881 1.59254 79.1345 1.68778C78.4057 2.98074 77.6631 4.26558 76.9205 5.5504C76.3647 6.51259 75.814 7.47773 75.2635 8.44305C74.9845 8.93213 74.7051 9.42099 74.4259 9.90991C74.3147 10.1045 74.2036 10.2991 74.0925 10.4937C73.8661 10.8901 73.6397 11.2863 73.4132 11.6825C72.8996 12.5807 72.3869 13.4794 71.8785 14.3806C71.4517 15.1368 71.0186 15.8892 70.5837 16.6407C70.0294 17.5989 69.4808 18.5605 68.9324 19.5222C68.7612 19.8223 68.5898 20.1221 68.4184 20.422C67.9049 21.3199 67.3923 22.2184 66.8841 23.1194C66.4573 23.8756 66.0242 24.6279 65.5893 25.3795C65.035 26.3377 64.4863 27.2993 63.9379 28.2609C63.7668 28.561 63.5954 28.8608 63.4239 29.1607C62.9105 30.0587 62.3979 30.9571 61.8897 31.8581C61.4628 32.6143 61.0297 33.3667 60.5949 34.1182C60.0402 35.0771 59.4912 36.0393 58.9424 37.0016C58.6635 37.4907 58.384 37.9796 58.1048 38.4685C57.9937 38.6631 57.8825 38.8577 57.7714 39.0523C57.5451 39.4487 57.3186 39.8449 57.0921 40.2411C56.5786 41.1393 56.0658 42.0379 55.5575 42.9392C55.1306 43.6954 54.6975 44.4478 54.2627 45.1993C53.6512 46.2564 53.0464 47.3174 52.4415 48.3784C52.2167 48.7725 51.9919 49.1667 51.767 49.5608C51.7118 49.6577 51.6565 49.7546 51.5996 49.8544C51.2247 50.5105 50.847 51.165 50.4682 51.8187C50.0647 52.5155 49.6672 53.2153 49.2754 53.9189C48.8329 54.7135 48.3818 55.5027 47.9259 56.2895C47.3723 57.2451 46.8251 58.2043 46.278 59.1638C45.999 59.6529 45.7196 60.1417 45.4404 60.6306C45.3292 60.8252 45.2181 61.0198 45.107 61.2144C44.8806 61.6108 44.6542 62.007 44.4276 62.4032C43.9141 63.3014 43.4014 64.2001 42.893 65.1014C42.4588 65.8708 42.0186 66.6366 41.5757 67.4008C41.323 67.8368 41.0716 68.2734 40.8239 68.7123C40.7788 68.7921 40.7336 68.8718 40.6872 68.954C40.6026 69.1035 40.5185 69.2533 40.4348 69.4034C40.3975 69.4692 40.3603 69.535 40.3219 69.6027C40.2897 69.6602 40.2575 69.7177 40.2243 69.7768C40.1338 69.9099 40.1338 69.9099 39.9554 70C39.9188 69.935 39.8821 69.8698 39.8443 69.8028C39.2023 68.6644 38.5595 67.5269 37.9041 66.3964C37.4532 65.6185 37.0082 64.8373 36.5663 64.0541C36.0722 63.1783 35.5733 62.3055 35.0695 61.4355C34.5207 60.4874 33.9779 59.5357 33.4352 58.584C33.2118 58.1924 32.9882 57.801 32.7646 57.4096C32.5973 57.1167 32.4301 56.8238 32.2627 56.5308C32.0411 56.1427 31.8193 55.7547 31.5973 55.3667C31.0141 54.3469 30.433 53.3259 29.8551 52.3029C29.1555 51.0649 28.4498 49.8306 27.7381 48.5997C27.5806 48.3273 27.4234 48.0548 27.2663 47.7823C27.0632 47.4302 26.8596 47.0786 26.6551 46.7274C26.5307 46.5134 26.4069 46.2992 26.2831 46.0849C26.1947 45.9322 26.1056 45.7798 26.0165 45.6275C25.936 45.4878 25.936 45.4877 25.8539 45.3452C25.8063 45.2632 25.7587 45.1812 25.7096 45.0967C25.5914 44.8546 25.5218 44.6842 25.5072 44.4144C25.6083 44.166 25.6083 44.166 25.7668 43.8946C25.8251 43.7933 25.8833 43.6921 25.9435 43.5877C26.0079 43.4785 26.0725 43.3693 26.1371 43.2602C26.2027 43.1471 26.2681 43.0341 26.3335 42.921C26.4672 42.6896 26.6019 42.4588 26.7371 42.2283C27.0266 41.7349 27.3118 41.2389 27.5976 40.7432C27.6988 40.5678 27.8 40.3923 27.9014 40.2168L28.0449 39.968C28.1765 39.7407 28.3092 39.5142 28.442 39.2877C28.5174 39.1573 28.5926 39.0268 28.6678 38.8964C28.7021 38.8389 28.7363 38.7814 28.7716 38.7223C28.9428 38.438 28.9427 38.4379 28.9622 38.1168C28.8869 37.9007 28.7902 37.7145 28.6779 37.5155C28.6323 37.4343 28.5868 37.3532 28.5398 37.2695C28.4901 37.1821 28.4403 37.0946 28.389 37.0045C28.3114 36.8668 28.3114 36.8668 28.2322 36.7262C27.7631 35.8969 27.2863 35.0723 26.8088 34.2479C25.9708 32.8006 25.1463 31.3453 24.3235 29.8892C23.5093 28.4486 22.6854 27.0141 21.8506 25.5856C21.1952 26.6305 20.5913 27.7058 19.9817 28.7783C19.7038 29.2671 19.4255 29.7557 19.1468 30.2441C19.0594 30.3972 18.9722 30.5505 18.885 30.7038C18.8321 30.7966 18.7791 30.8894 18.7245 30.985C18.678 31.0668 18.6314 31.1487 18.5834 31.233C18.4883 31.3956 18.3869 31.5545 18.2832 31.7117C17.9578 31.6022 17.9395 31.5313 17.7797 31.2356C17.7348 31.1535 17.6898 31.0715 17.6434 30.987C17.5711 30.8524 17.571 30.8524 17.4973 30.7151C17.3925 30.5241 17.2876 30.3331 17.1826 30.1422C17.1286 30.0436 17.0746 29.9451 17.019 29.8436C16.7664 29.3872 16.505 28.9362 16.243 28.4854C15.6374 27.4405 15.0379 26.392 14.4396 25.3428C14.2685 25.0427 14.097 24.7428 13.9256 24.4429C13.4122 23.545 12.8995 22.6465 12.3913 21.7455C11.9645 20.9893 11.5314 20.2369 11.0965 19.4854C10.5423 18.5272 9.99358 17.5657 9.44517 16.6041C9.27402 16.304 9.10261 16.0041 8.93119 15.7041C8.41774 14.8062 7.90513 13.9077 7.39688 13.0068C6.97012 12.2505 6.53702 11.4982 6.10211 10.7467C5.54743 9.78775 4.99842 8.8256 4.44964 7.86326C4.17068 7.37418 3.89132 6.8853 3.61204 6.3964C3.50091 6.20178 3.38977 6.00718 3.27864 5.81257C3.05229 5.41625 2.82583 5.02001 2.59929 4.6238C2.0716 3.70077 1.54438 2.77747 1.02007 1.85248C0.978658 1.77957 0.937222 1.70668 0.894564 1.63157C0.588877 1.09141 0.295119 0.546534 0 0L29.1639 0ZM65.1865 6.08012C63.3232 5.98303 61.499 5.61135 60.727 7.68687C60.6274 7.9948 60.5304 8.27421 60.3666 8.55328C60.251 8.73946 60.1384 8.92768 60.0298 9.1182C59.9226 9.30676 59.8153 9.49523 59.708 9.68369C59.6499 9.7855 59.5937 9.88432 59.5373 9.98306C59.3448 10.3214 59.1517 10.6593 58.9576 10.9966C58.5767 11.6588 58.1984 12.3224 57.8258 12.9896C57.2507 14.0205 56.6684 15.0471 56.0821 16.0716C55.8008 16.5627 55.52 17.0541 55.2393 17.5456C54.9056 18.1301 54.572 18.7147 54.2379 19.2989C53.6047 20.4057 52.9736 21.5135 52.3468 22.6239C51.8993 23.4165 51.4483 24.2068 50.9922 24.9944C50.5247 25.8016 50.0623 26.6117 49.6039 27.4243C49.3077 27.9496 49.0112 28.4748 48.7144 28.9997C48.6833 29.0546 48.6533 29.1078 48.6232 29.1611C47.9927 30.2761 47.3582 31.389 46.7221 32.501C45.8602 34.0077 45.0004 35.5154 44.1472 37.027C43.9437 37.3878 43.7402 37.7484 43.5365 38.109C43.5054 38.1642 43.4751 38.2178 43.4448 38.2714C43.0446 38.9798 42.6422 39.6868 42.2346 40.3908C41.7831 41.1695 41.3357 41.9501 40.8974 42.7365C40.3763 43.6717 39.8469 44.602 39.3151 45.5311C39.1454 45.8273 38.9758 46.1237 38.8063 46.4202C38.722 46.5679 38.722 46.5679 38.6392 46.7128C38.5279 46.9076 38.4167 47.1024 38.3055 47.2973C38.0216 47.7972 37.7389 48.2978 37.445 48.7918C37.3155 49.0087 37.1864 49.226 37.0583 49.4438C36.9967 49.5486 36.9348 49.6533 36.873 49.7578L36.6907 50.0576L36.527 50.3368C36.3801 50.5818 36.3801 50.5818 36.2988 50.8108C36.3584 51.0398 36.3584 51.0399 36.5965 51.4838C36.6429 51.5634 36.6881 51.6407 36.7332 51.718C36.7855 51.8079 36.8361 51.8952 36.8869 51.9825C36.9987 52.1737 37.1104 52.3651 37.2217 52.5567C37.2802 52.6574 37.337 52.7552 37.3937 52.853C38.233 54.2944 39.0503 55.7473 39.8564 57.2078C39.89 57.2688 39.9228 57.3281 39.9554 57.3874H40.1338C40.2215 57.2068 40.3114 57.0285 40.408 56.8524C40.4439 56.7893 40.4787 56.728 40.5135 56.6667C40.5551 56.5934 40.5954 56.5223 40.6357 56.4511C40.7276 56.2895 40.8194 56.1278 40.9111 55.966C40.9621 55.876 41.0116 55.7887 41.0611 55.7014C41.3396 55.2107 41.6175 54.7198 41.8952 54.2287C41.9848 54.0702 42.0746 53.9115 42.1643 53.753C42.4399 53.266 42.7155 52.7789 42.9908 52.2917C43.1402 52.0271 43.2896 51.7624 43.4392 51.4979C43.4842 51.4182 43.4842 51.4182 43.5284 51.3401C43.9349 50.6209 44.3429 49.9027 44.7532 49.1858C45.2239 48.3632 45.6922 47.5395 46.1538 46.7117C46.5676 45.9696 46.9861 45.2306 47.408 44.4932C47.9891 43.4778 48.5664 42.4603 49.1416 41.4414C49.8262 40.2287 50.5142 39.0182 51.2054 37.8094C51.3769 37.5095 51.5483 37.2096 51.7194 36.9096C52.2678 35.9479 52.8165 34.9863 53.3708 34.0281C53.8057 33.2766 54.2388 32.5242 54.6656 31.768C55.174 30.8668 55.6867 29.9681 56.2002 29.0699C56.4268 28.6737 56.6532 28.2775 56.8796 27.8811C56.9907 27.6865 57.1018 27.4919 57.2129 27.2973C57.4922 26.8084 57.7716 26.3196 58.0506 25.8305C58.5993 24.8681 59.1484 23.9059 59.703 22.947C60.1379 22.1955 60.571 21.4432 60.9978 20.6869C61.506 19.7859 62.0186 18.8875 62.5321 17.9896C62.7035 17.6896 62.8749 17.3898 63.0461 17.0897C63.6485 16.0332 64.252 14.9774 64.8606 13.9245C65.445 12.9138 66.0295 11.9031 66.6047 10.8869C66.6635 10.7827 66.7206 10.6814 66.7778 10.5803C66.9291 10.3125 67.0804 10.0447 67.2313 9.77667C67.5339 9.2391 67.8374 8.70234 68.151 8.17119C68.1973 8.09277 68.1974 8.09278 68.2428 8.01591C68.3583 7.81947 68.4739 7.6231 68.5897 7.4268C68.6462 7.33297 68.7009 7.24188 68.7557 7.15081C68.8064 7.06457 68.8557 6.98087 68.9051 6.89717C68.95 6.82186 68.9937 6.74875 69.0374 6.67564C69.1193 6.4865 69.1193 6.48649 69.0301 6.21622C68.1826 6.17432 67.3354 6.14059 66.487 6.11944C66.0534 6.10948 65.6199 6.10053 65.1865 6.08012Z";

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      // Create SVG path for precise logo detection
      const svgPath = new Path2D(svgPathData);
      svgPathRef.current = svgPath;

      // Generate dots
      const dots: Array<{ x: number; y: number; targetOpacity: number; currentOpacity: number }> = [];
      
      // Responsive logo positioning: top center on mobile, right side on desktop
      const isMobile = rect.width < 768; // md breakpoint
      const logoX = isMobile ? rect.width / 2 : rect.width * 0.75;
      const centerY = isMobile ? rect.height * 0.25 : rect.height / 2; // Top quarter on mobile
      
      // SVG viewBox is 80x70, we'll scale it to fit
      // Smaller on mobile, larger on desktop
      const logoSizeMultiplier = isMobile ? 0.45 : 0.65;
      const logoWidth = Math.min(rect.width, rect.height) * logoSizeMultiplier;
      const logoHeight = (logoWidth * 70) / 80; // Maintain aspect ratio
      const scale = logoWidth / 80;

      // Create a temporary canvas to check if points are inside the path
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = rect.width;
      tempCanvas.height = rect.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      // Draw the SVG path on the right side
      tempCtx.save();
      tempCtx.translate(logoX, centerY); // Move to right side position
      tempCtx.scale(scale, scale); // Scale the path
      tempCtx.translate(-40, -35); // Center the SVG viewBox (which is 80x70, so center is at 40, 35)
      tempCtx.fillStyle = "#ffffff";
      tempCtx.fill(svgPath);
      tempCtx.restore();

      // Get image data to check pixel colors
      const imageData = tempCtx.getImageData(0, 0, rect.width, rect.height);
      const data = imageData.data;

      for (let x = spacing / 2; x < rect.width; x += spacing) {
        for (let y = spacing / 2; y < rect.height; y += spacing) {
          // Check if this pixel is inside the logo (white pixel in temp canvas)
          const pixelIndex = (Math.floor(y) * rect.width + Math.floor(x)) * 4;
          const isLogoDot = data[pixelIndex] > 128; // White pixel means inside logo
          
          // Calculate normalized Y position for stagger effect (0 = top, 1 = bottom)
          const normalizedY = y / rect.height;
          
          dots.push({
            x,
            y,
            targetOpacity: isLogoDot ? logoOpacity : backgroundOpacity,
            currentOpacity: 0, // Start at 0, will animate in
            isLogo: isLogoDot,
            normalizedY, // Store Y position for stagger effect
          });
        }
      }

      dotsRef.current = dots;
      loadProgressRef.current = 0;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const totalTime = animationDuration + 2000; // Add 2 seconds for logo delay
      const progress = Math.min(elapsed / totalTime, 1);
      loadProgressRef.current = progress;
      timeRef.current += 0.016; // ~60fps

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const hoverRadius = 80; // Distance from mouse where dots react

      // Animation phases
      const backgroundAnimationTime = animationDuration; // Background dots animate in first
      const logoDelay = 2000; // 2 second delay before logo animation
      const logoAnimationDuration = 3000; // Logo animation takes 3 seconds (slow fade-in)

      const elapsedSeconds = elapsed / 1000;
      const logoStartTime = logoDelay / 1000;
      const isLogoPhase = elapsedSeconds > logoStartTime;
      const logoPhaseProgress = isLogoPhase ? Math.min((elapsedSeconds - logoStartTime) / (logoAnimationDuration / 1000), 1) : 0;

      dots.forEach((dot, index) => {
        // Calculate distance from mouse
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = Math.max(0, 1 - distToMouse / hoverRadius);
        
        let baseOpacity = 0;

        if (dot.isLogo) {
          // Logo dots: Wait for delay, then slowly fade in with uneven timing
          if (isLogoPhase) {
            // Bottom appears faster (normalizedY closer to 1 = faster)
            // Top appears slower (normalizedY closer to 0 = slower)
            // Invert normalizedY so bottom (1.0) starts earlier, top (0.0) starts later
            const positionDelay = (1 - dot.normalizedY) * 0.6; // Top has up to 0.6 delay, bottom has 0 delay
            const adjustedProgress = Math.max(0, (logoPhaseProgress - positionDelay) / (1 - positionDelay));
            
            // Slow, smooth fade-in with ease-out curve
            baseOpacity = dot.targetOpacity * Math.pow(Math.max(0, adjustedProgress), 0.7);
          }
        } else {
          // Background dots: Animate in immediately
          const bgProgress = Math.min(elapsed / backgroundAnimationTime, 1);
          const dotDelay = (index % 20) / 100;
          const adjustedProgress = Math.max(0, (bgProgress - dotDelay) / (1 - dotDelay));
          baseOpacity = dot.targetOpacity * adjustedProgress;
        }

        // Mouse hover effect - increase opacity when near mouse
        const hoverBoost = mouseInfluence * 0.4; // Increase opacity by up to 40% when hovered
        const finalOpacity = Math.min(1, baseOpacity + hoverBoost);
        
        // Smooth interpolation
        dot.currentOpacity += (finalOpacity - dot.currentOpacity) * 0.15;

        // Draw dot without glow effect
        if (dot.currentOpacity > 0.01) {
          // Draw main dot only (no glow/shadow)
          ctx.fillStyle = `rgba(${Math.round(dotRgb[0] * 255)}, ${Math.round(dotRgb[1] * 255)}, ${Math.round(dotRgb[2] * 255)}, ${dot.currentOpacity})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [dotSize, spacing, logoOpacity, backgroundOpacity, animationDuration, dotRgb, svgPathData]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 w-full h-full", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
