export default function Account() {
  return (
    <div className="flex items-center justify-center">
      <div className="xl:min-w-[1400px] max-w-[1400px]">
        {/* features */}
        <section className="bg-gray-50 py-20 mt-10 lg:mt-30">
          {/* heading */}
          <div className="mx-auto px-2">
            <h1 className="text-4xl text-left text-blue-500 font-semibold">
              Account Details
            </h1>
          </div>
          {/* feature 1 */}
          <div className="relative mt-20 lg:mt-24 px-10">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-24">
              {/* content */}
              <div className="flex flex-1 flex-col items-center">
                <h1 className="text-4xl text-left text-blue-500 font-semibold">
                  Account details and ability to delete said account coming
                  soon!
                </h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
