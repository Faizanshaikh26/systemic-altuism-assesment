export default function SongLoader() {
  return (
    <>
      <div
        style={{
          width: "30px",
          marginRight:"10px",
          marginTop:"8px",
          height: "20px",
          background: `
            no-repeat radial-gradient(farthest-side, #6B7280 93%, #0000) 0 0,
            no-repeat radial-gradient(farthest-side, #6B7280 93%, #0000) 50% 0,
            no-repeat radial-gradient(farthest-side, #6B7280 93%, #0000) 100% 0
          `,
          backgroundSize: "8px 8px",
          position: "relative",
          animation: "l4-0 1s linear infinite alternate",
        }}
        className="loader"
      >
        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "10px",
            background: "#fff", 
            left: 0,
            top: 0,
            animation:
              "l4-1 1s linear infinite alternate, l4-2 0.5s cubic-bezier(0,200,.8,200) infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes l4-0 {
          0%      {background-position: 0 100%, 50% 0, 100% 0}
          8%,42%  {background-position: 0 0, 50% 0, 100% 0}
          50%     {background-position: 0 0, 50% 100%, 100% 0}
          58%,92% {background-position: 0 0, 50% 0, 100% 0}
          100%    {background-position: 0 0, 50% 0, 100% 100%}
        }

        @keyframes l4-1 {
          100% { left: calc(100% - 8px); }
        }

        @keyframes l4-2 {
          100% { top: -0.1px; }
        }
      `}</style>
    </>
  );
}
