import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ConfirmationStepProps {
  success: boolean;
  errorMessage?: string;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ 
  success, 
  errorMessage 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (success) {
    return (
      <div className="text-center space-y-6 py-8">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-green-700">
            {t('form.compliance.successTitle')}
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-lg">
                {t('form.compliance.successMessage')}
              </p>
              <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-lg">
                <p className="text-sm font-medium">
                  📧 {t('form.compliance.emailConfirmation')}
                </p>
              </div>
              <div className="space-y-2 text-left">
                <h3 className="font-semibold text-lg">{t('form.compliance.whatHappensNext')}</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t('form.compliance.nextSteps.review')}</li>
                  <li>{t('form.compliance.nextSteps.contact')}</li>
                  <li>{t('form.compliance.nextSteps.choose')}</li>
                  <li>{t('form.compliance.nextSteps.schedule')}</li>
                </ul>
              </div>
              <Button 
                onClick={() => navigate('/')}
                className="w-full mt-6"
                size="lg"
              >
                {t('form.compliance.returnHome')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6 py-8">
      <XCircle className="mx-auto h-20 w-20 text-destructive" />
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-destructive">
          {t('form.compliance.submissionFailed')}
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
              <p className="font-medium mb-2">{t('form.compliance.errorEncountered')}</p>
              <p className="text-sm">{errorMessage || t('form.compliance.unexpectedError')}</p>
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-semibold text-lg">{t('form.compliance.whatYouCanDo')}</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{t('form.compliance.troubleshooting.tryAgain')}</li>
                <li>{t('form.compliance.troubleshooting.checkFields')}</li>
                <li>{t('form.compliance.troubleshooting.checkConnection')}</li>
                <li>{t('form.compliance.troubleshooting.contactSupport')}</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-lg">
              <p className="text-sm">
                <strong>{t('form.compliance.needHelp')}</strong> {t('form.compliance.contactUs')}{' '}
                <a href="mailto:support@mydentipay.com" className="underline">
                  support@mydentipay.com
                </a>
              </p>
            </div>
            <Button 
              onClick={() => window.location.reload()}
              className="w-full mt-6"
              size="lg"
            >
              {t('form.compliance.tryAgainButton')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmationStep;
