import about1 from '../../../../public/assets/img/about-1.jpg';
import about2 from '../../../../public/assets/img/about-2.jpg';
import about3 from '../../../../public/assets/img/about-3.jpg'

import aboutChild from '../../../../public/assets/img/about-child.jpg';
export default function About({  }) {
    return (
       
        <div className="container-fluid py-5 bg-gray-100">
        <div className="container py-5">
            <div className="flex max-[768px]:flex-wrap mb-5 gap-5">
                <div className="w-full xl:w-1/2">
                    <div className="flex max-[768px]:flex-wrap gap-4">
                        <div className="w-1/2">
                            <img src={about1} className="w-full h-full object-cover animate-zoomIn" alt="About 1" />
                        </div>
                        <div className="w-1/2">
                            <img src={about2} className="w-full pb-3 animate-zoomIn" alt="About 2" />
                            <img src={about3} className="w-full pt-3 animate-zoomIn" alt="About 3" />
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-1/2 animate-fadeIn delay-500">
                    <p className="text-lg uppercase text-primary">About AlJihaad</p>
                    <h1 className="text-4xl font-bold pb-4 m-0">Allah Helps Those Who Help Themselves</h1>
                    <p className="pb-4">Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam. Etiam quis mauris justo. Vivamus purus nulla, rutrum ac risus in.</p>
                    <div className="flex flex-wrap mb-4 gap-4">
                        <div className="w-full md:w-1/2 flex items-center">
                            <span className="bg-primary text-dark p-4 rounded-full mt-4 mr-2">
                                <i className="fa fa-eye fa-4x"></i>
                            </span>
                            <div className="ml-4">
                                <h5>Our Vision</h5>
                                <p>Lorem ipsum dolor sit amet tetur nod elit sed</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex items-center">
                            <span className="bg-primary text-dark p-4 rounded-full mt-4 mr-2">
                                <i className="fa fa-flag fa-4x"></i>
                            </span>
                            <div className="ml-4">
                                <h5>Our Mission</h5>
                                <p>Lorem ipsum dolor sit amet tetur nod elit sed</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 p-3 mb-4">
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-1/4">
                                <img src={aboutChild} className="w-full rounded-full" alt="About Child" />
                            </div>
                            <div className="w-1/2">
                                <p className="mb-0">Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam. Etiam quis mauris justo.</p>
                            </div>
                            <div className="w-1/4 text-center">
                                <h2 className="mb-0 text-primary">$20,46</h2>
                                <h5 className="mb-0">Raised</h5>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="w-full md:w-1/2">
                            <p className="mb-2"><i className="fa fa-check text-primary mr-3"></i>Charity & Donation</p>
                            <p className="mb-0"><i className="fa fa-check text-primary mr-3"></i>Parent Education</p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className="mb-2"><i className="fa fa-check text-primary mr-3"></i>Hadith & Sunnah</p>
                            <p className="mb-0"><i className="fa fa-check text-primary mr-3"></i>Mosque Development</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center bg-primary py-5 animate-fadeIn delay-100">
                <div className="flex flex-wrap items-center gap-4 justify-center">
                    <div className="w-full lg:w-1/6">
                        <i className="fa fa-mosque fa-5x text-white"></i>
                    </div>
                    <div className="w-full lg:w-7/12 text-center lg:text-left">
                        <h1 className="mb-0 text-white text-3xl">Every Muslim Needs To Realize The Importance Of The "Pillar" Of Islam</h1>
                    </div>
                    <div className="w-full lg:w-1/6">
                        <a href="#" className="btn btn-light py-2 px-4">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
