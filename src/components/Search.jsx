import React from 'react'

const Search = () => {
  return (
    <div>

        
        {searchName && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Search Results ({filteredDoctors.length} doctor
                {filteredDoctors.length !== 1 ? "s" : ""} found)
              </h3>
              {(searchName ||
                selectedSpecialization !== "All Specializations" ||
                showOnlyAvailable) && (
                <button
                  onClick={() => {
                    setSearchName("");
                    setSelectedSpecialization("All Specializations");
                    setShowOnlyAvailable(false);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Searching doctors...</span>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="text-center py-12">
                <Stethoscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-600 mb-2">
                  No doctors found
                </h4>
                <p className="text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDoctors.slice(0, 3).map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        )}
    </div>
  )
}

export default Search