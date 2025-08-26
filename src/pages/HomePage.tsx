import React from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { generateOrganizationSchema, generateWebsiteSchema } from '../components/seo/StructuredData'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import ChatBotTrigger from '../components/chat/ChatBotTrigger'

export default function HomePage() {
  const structuredData = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Hindu Education & Vedic Learning Platform - eYogi Gurukul",
      "description": "Discover authentic Hindu traditions, Vedic philosophy, Sanskrit, mantras, and yoga through expert-led online courses. Join our global community of Sanatan Dharma learners.",
      "url": "https://eyogi-gurukul.vercel.app",
      "mainEntity": {
        "@type": "EducationalOrganization",
        "name": "eYogi Gurukul"
      },
      "about": [
        { "@type": "Thing", "name": "Hindu Religion" },
        { "@type": "Thing", "name": "Hinduism" },
        { "@type": "Thing", "name": "Vedic Philosophy" },
        { "@type": "Thing", "name": "Sanatan Dharma" },
        { "@type": "Thing", "name": "Hindu Culture" },
        { "@type": "Thing", "name": "Indian Hindu Culture" }
      ]
    }
  ]

  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Expert Teachers',
      description: 'Learn from qualified instructors with deep knowledge of Vedic traditions'
    },
    {
      icon: BookOpenIcon,
      title: 'Comprehensive Curriculum',
      description: 'Structured courses covering all aspects of ancient wisdom and modern applications'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Learning',
      description: 'Join a global community of learners on the path of spiritual growth'
    },
    {
      icon: StarIcon,
      title: 'Certified Programs',
      description: 'Earn certificates upon completion of courses and showcase your achievements'
    }
  ]

  const gurukuls = [
    {
      name: 'Hinduism Gurukul',
      description: 'Explore Hindu traditions, philosophy, and practices',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop',
      courses: 12,
      students: 450,
      slug: 'hinduism'
    },
    {
      name: 'Mantra Gurukul',
      description: 'Learn sacred mantras and their transformative power',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      courses: 8,
      students: 320,
      slug: 'mantra'
    },
    {
      name: 'Philosophy Gurukul',
      description: 'Dive deep into ancient philosophical traditions',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      courses: 15,
      students: 280,
      slug: 'philosophy'
    },
    {
      name: 'Sanskrit Gurukul',
      description: 'Master the sacred language of Sanskrit',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
      courses: 10,
      students: 380,
      slug: 'sanskrit'
    },
    {
      name: 'Yoga & Wellness',
      description: 'Integrate physical, mental, and spiritual wellness',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
      courses: 18,
      students: 520,
      slug: 'yoga-wellness'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Student, Philosophy Gurukul',
      content: 'The depth of knowledge and the way it\'s presented makes ancient wisdom accessible to modern minds.',
      rating: 5
    },
    {
      name: 'Raj Patel',
      role: 'Parent',
      content: 'My daughter has learned so much about our culture and traditions. The teachers are excellent.',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      role: 'Student, Yoga Gurukul',
      content: 'The holistic approach to wellness has transformed my daily practice and understanding.',
      rating: 5
    }
  ]

  return (
    <>
      <SEOHead
        title="Hindu Education & Vedic Learning Platform"
        description="Learn authentic Hindu traditions, Vedic philosophy, Sanskrit, mantras, and yoga through comprehensive online courses. Discover Sanatan Dharma wisdom with expert teachers in our traditional Gurukul system."
        keywords={[
          'Hindu Education Online', 'Vedic Learning Platform', 'Sanatan Dharma Courses',
          'Hindu Philosophy Online', 'Sanskrit Learning Online', 'Hindu Culture Education',
          'Indian Hindu Traditions', 'Vedic Wisdom Courses', 'Hindu Gurukul Online',
          'Traditional Hindu Education', 'Authentic Hindu Teaching', 'Hindu Heritage Learning',
          'Vedic Studies Online', 'Hindu Spiritual Education', 'Dharma Education Platform',
          'Hindu Values Learning', 'Vedic Knowledge Online', 'Hindu Religion Courses'
        ]}
        canonicalUrl="/"
        structuredData={structuredData}
      />
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-red-50 overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="info" className="w-fit">
                  🕉️ Authentic Hindu Education & Vedic Learning
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight" itemProp="headline">
                  Learn Authentic <span className="gradient-text">Hindu Traditions</span> & Vedic Wisdom Online
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed" itemProp="description">
                  Discover authentic Hindu religion, Vedic philosophy, Sanskrit, mantras, and yoga through our comprehensive Sanatan Dharma education platform. Learn traditional Hindu culture from expert teachers in our modern Gurukul system designed for all ages.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Courses
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/gurukuls">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse Gurukuls
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span>1,950+ Hindu Education Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span>63+ Vedic Learning Courses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span>5 Traditional Hindu Gurukuls</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop"
                  alt="Hindu Education - Ancient Vedic wisdom meets modern online learning at eYogi Gurukul"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <AcademicCapIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Certified Hindu Education</p>
                    <p className="text-sm text-gray-600">Authentic Vedic Learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose eYogi Gurukul for Hindu Education?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bridge the gap between ancient Hindu wisdom and modern learning technology, 
              making authentic Vedic knowledge and Sanatan Dharma accessible to everyone, everywhere.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="pt-8">
                  <div className="h-16 w-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gurukuls Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Our Traditional Hindu Gurukuls
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each Hindu Gurukul specializes in different aspects of Vedic knowledge and Sanatan Dharma, 
              offering comprehensive Hindu education paths for students of all ages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gurukuls.map((gurukul, index) => (
              <Card key={index} className="card-hover overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={gurukul.image}
                    alt={`${gurukul.name} - Traditional Hindu education and Vedic learning center`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{gurukul.name}</h3>
                  <p className="text-gray-600 mb-4">{gurukul.description}</p>
                  
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <span>{gurukul.courses} Hindu Courses</span>
                    <span>{gurukul.students} Vedic Students</span>
                  </div>
                  
                  <Link to={`/gurukuls/${gurukul.slug}`}>
                    <Button variant="outline" className="w-full">
                      Explore Hindu Gurukul
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Hindu Education Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our global community of Hindu and Vedic learning students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Hindu Education {testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Begin Your Hindu Education Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students worldwide in discovering the timeless wisdom 
            of Hindu traditions and Vedic philosophy through our comprehensive Sanatan Dharma courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Start Hindu Learning Free
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600">
                Browse Hindu Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* AI Chat Assistant */}
      <ChatBotTrigger />
    </div>
    </>
  )
}