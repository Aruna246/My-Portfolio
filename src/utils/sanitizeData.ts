import { PortfolioCMSData } from '../types';
import { initialPortfolioData } from '../initialData';

export function sanitizePortfolioData(raw: any): PortfolioCMSData {
  if (!raw || typeof raw !== 'object' || !raw.profile) {
    return initialPortfolioData;
  }
  return {
    ...initialPortfolioData,
    ...raw,
    profile: {
      ...initialPortfolioData.profile,
      ...(raw.profile || {}),
      socials: {
        ...initialPortfolioData.profile.socials,
        ...(raw.profile?.socials || {})
      }
    },
    about: {
      ...initialPortfolioData.about,
      ...(raw.about || {})
    },
    skillsCategories:
      Array.isArray(raw.skillsCategories) && raw.skillsCategories.length > 0
        ? raw.skillsCategories
        : initialPortfolioData.skillsCategories,
    projects: Array.isArray(raw.projects) ? raw.projects : initialPortfolioData.projects,
    education: Array.isArray(raw.education) ? raw.education : initialPortfolioData.education,
    experience: Array.isArray(raw.experience) ? raw.experience : initialPortfolioData.experience,
    awards: Array.isArray(raw.awards) ? raw.awards : initialPortfolioData.awards,
    courseworkList:
      Array.isArray(raw.courseworkList) && raw.courseworkList.length > 0
        ? raw.courseworkList
        : initialPortfolioData.courseworkList,
    cta: {
      ...initialPortfolioData.cta,
      ...(raw.cta || {})
    },
    resume: {
      ...initialPortfolioData.resume,
      ...(raw.resume || {})
    },
    theme: {
      ...initialPortfolioData.theme,
      ...(raw.theme || {})
    }
  };
}
