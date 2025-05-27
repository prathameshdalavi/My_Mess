export const Information = () => {
    return (
        <div 
          className="w-full py-44 "
          style={{
            background: "linear-gradient(135deg, #154313 0%, #f8f9f0 100%)"
          }}
        >
          <div className="container mx-auto ">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-8">
              What is Aai's Kitchen
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                  Aai's Kitchen is a home-style meal service that brings the warmth of homemade food to students and professionals away from home.
                </p>
                <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                  Founded on the principle that good food nourishes both body and soul, we prepare every meal with the same care and love that a mother ("Aai" in Marathi) would put into her cooking.
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                  Our menu features traditional recipes made with fresh, locally-sourced ingredients, offering balanced nutrition and authentic flavors.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  More than just a meal service, we're creating a community where everyone can experience the comfort of home through food.
                </p>
              </div>
            </div>
          </div>
        </div>
    );
};