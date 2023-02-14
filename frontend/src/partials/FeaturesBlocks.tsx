
function FeaturesBlocks() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">People are seldom compensated for their feedback.</h2>
            <p className="text-xl text-gray-400">Polls for Pi changes that.</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle className="fill-current text-purple-600" cx="32" cy="32" r="32" />
                <path
                  className="stroke-current text-purple-100"
                  d="M32 14C33.105 14 34 14.895 34 16V18.155C35.817 18.442 37.491 19.117 38.841 20.118C40.684 21.485 42 23.535 42 26C42 27.105 41.105 28 40 28C38.895 28 38 27.105 38 26C38 25.065 37.516 24.115 36.459 23.332C35.393 22.541 33.823 22 32 22C30.177 22 28.607 22.541 27.541 23.332C26.484 24.115 26 25.065 26 26C26 26.935 26.484 27.885 27.541 28.668C28.607 29.459 30.177 30 32 30C34.577 30 37.007 30.759 38.841 32.118C40.684 33.485 42 35.535 42 38C42 40.465 40.684 42.515 38.841 43.882C37.491 44.883 35.817 45.558 34 45.845V48C34 49.105 33.105 50 32 50C30.895 50 30 49.105 30 48V45.845C28.183 45.558 26.509 44.883 25.159 43.882C23.316 42.515 22 40.465 22 38C22 36.895 22.895 36 24 36C25.105 36 26 36.895 26 38C26 38.935 26.484 39.885 27.541 40.668C28.607 41.459 30.177 42 32 42C33.823 42 35.393 41.459 36.459 40.668C37.516 39.885 38 38.935 38 38C38 37.065 37.516 36.115 36.459 35.332C35.393 34.541 33.823 34 32 34C29.423 34 26.993 33.241 25.159 31.882C23.316 30.515 22 28.465 22 26C22 23.535 23.316 21.485 25.159 20.118C26.509 19.117 28.183 18.442 30 18.155V16C30 14.895 30.895 14 32 14Z"
                  fill="none" fillRule="evenodd"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h4 className="h4 mb-2">Incentives</h4>
              <p className="text-lg text-gray-400 text-center">Give back to your community.</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle className="fill-current text-purple-600" cx="32" cy="32" r="32" />
                <path
                  className="stroke-current text-purple-100"
                  d="M1.142 19.256L3.391 19.423C5.723 16.785 6.639 8.983 20.381 10.51C19.882 43.936 5.224 47.462 6.139 54.319C6.473 58.207 9.554 60.594 12.886 60.733C23.407 60.372 22.935 46.185 26.212 10.427L39.788 10.427C39.066 23.031 37.094 35.635 36.872 47.99C37.039 56.207 42.036 60.594 48.616 60.649C59.443 61.01 62.858 48.379 62.858 42.993L60.526 42.993C60.303 47.434 58.166 50.628 53.613 50.821C41.203 50.989 48.033 29.001 48.116 10.593L62.858 10.678L62.775 1.266C1.501 0.969 9.279 -0.233 1.142 19.256z"
                  fill="none" fillRule="evenodd"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform="scale(0.5) translate(30, 30)"
                />
              </svg>
              <h4 className="h4 mb-2">Built on Pi</h4>
              <p className="text-lg text-gray-400 text-center">Polls built on the Pi blockchain.</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <path
                  className="stroke-current text-purple-100"
                  d="M18.749 20.5a3.75 3.75 0 1 0 7.5 0 3.75 3.75 0 1 0 -7.5 0zM53.251 4H10.749c-1.106 0 -2.001 0.893 -2.001 2.001v41.251c0 1.106 0.893 2.001 2.001 2.001h42.5c1.106 0 2.001 -0.893 2.001 -2.001V6.001c0 -1.106 -0.893 -2.001 -2.001 -2.001zm-2.001 41.251H12.75V8h38.5v37.251zM37.75 20.5a3.75 3.75 0 1 0 7.5 0 3.75 3.75 0 1 0 -7.5 0zm15.638 34.749H10.612c-1.032 0 -1.862 0.893 -1.862 2.001v2.25c0 0.275 0.206 0.5 0.462 0.5h45.569c0.256 0 0.462 -0.225 0.462 -0.5v-2.25c0.006 -1.106 -0.826 -2.001 -1.856 -2.001zM41.5 31.75H22.5c-0.275 0 -0.5 0.225 -0.5 0.5v3.75c0 0.275 0.225 0.5 0.5 0.5h19c0.275 0 0.5 -0.225 0.5 -0.5v-3.75c0 -0.275 -0.225 -0.5 -0.5 -0.5z"
                  fill="none" fillRule="evenodd"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform="scale(0.5) translate(30, 30)"
                />
              </svg>
              <h4 className="h4 mb-2">Automated</h4>
              <p className="text-lg text-gray-400 text-center">Choose when to distribute your rewards.</p>
            </div>

            {/* 4th item */}
            {/* <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="300" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <g transform="translate(22 21)" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                  <path className="stroke-current text-purple-100" d="M17 22v-6.3a8.97 8.97 0 003-6.569A9.1 9.1 0 0011.262 0 9 9 0 002 9v1l-2 5 2 1v4a2 2 0 002 2h4a5 5 0 005-5v-5" />
                  <circle className="stroke-current text-purple-300" cx="13" cy="9" r="3" />
                </g>
              </svg>
              <h4 className="h4 mb-2">Instant Features</h4>
              <p className="text-lg text-gray-400 text-center">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.</p>
            </div> */}

            {/* 5th item */}
            {/* <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <g strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                  <path className="stroke-current text-purple-100" d="M29 42h10.229a2 2 0 001.912-1.412l2.769-9A2 2 0 0042 29h-7v-4c0-2.373-1.251-3.494-2.764-3.86a1.006 1.006 0 00-1.236.979V26l-5 6" />
                  <path className="stroke-current text-purple-300" d="M22 30h4v12h-4z" />
                </g>
              </svg>
              <h4 className="h4 mb-2">Instant Features</h4>
              <p className="text-lg text-gray-400 text-center">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.</p>
            </div> */}

            {/* 6th item */}
            {/* <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="500" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <g transform="translate(21 22)" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                  <path className="stroke-current text-purple-300" d="M17 2V0M19.121 2.879l1.415-1.415M20 5h2M19.121 7.121l1.415 1.415M17 8v2M14.879 7.121l-1.415 1.415M14 5h-2M14.879 2.879l-1.415-1.415" />
                  <circle className="stroke-current text-purple-300" cx="17" cy="5" r="3" />
                  <path className="stroke-current text-purple-100" d="M8.86 1.18C3.8 1.988 0 5.6 0 10c0 5 4.9 9 11 9a10.55 10.55 0 003.1-.4L20 21l-.6-5.2a9.125 9.125 0 001.991-2.948" />
                </g>
              </svg>
              <h4 className="h4 mb-2">Instant Features</h4>
              <p className="text-lg text-gray-400 text-center">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.</p>
            </div> */}

          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;
