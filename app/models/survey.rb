class Survey < ActiveRecord::Base
  has_many :subrecords, :dependent => :destroy
end
